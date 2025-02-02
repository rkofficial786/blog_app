import React, { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

interface HTMLContentProps {
  content: string;
  maxLines?: number;
  onContentLoad?: () => void;
}

export const HTMLContent: React.FC<HTMLContentProps> = ({
  content,
  maxLines,
  onContentLoad,
}) => {
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const webViewRef = useRef<WebView>(null);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: system-ui;
            font-size: 16px;
            line-height: 1.5;
            color: #64748B;
            overflow-y: hidden;
            ${maxLines ? `
              display: -webkit-box;
              -webkit-line-clamp: ${maxLines};
              -webkit-box-orient: vertical;
              overflow: hidden;
            ` : ''}
          }
          img {
            max-width: 100%;
            height: auto;
            display: block;
          }
          p {
            margin-bottom: 1em;
          }
        </style>
      </head>
      <body>
        <div id="content">
          ${content}
        </div>
      </body>
    </html>
  `;

  const injectedJavaScript = `
    (function() {
      function updateHeight() {
        const contentDiv = document.getElementById('content');
        const height = contentDiv.offsetHeight;
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'height',
          height: height
        }));
      }

      // Update height when content changes
      const observer = new MutationObserver(updateHeight);
      observer.observe(document.body, { 
        childList: true, 
        subtree: true, 
        attributes: true 
      });

      // Update height when images load
      const images = document.getElementsByTagName('img');
      for (let i = 0; i < images.length; i++) {
        images[i].onload = updateHeight;
        if (images[i].complete) updateHeight();
      }

      // Initial height calculation
      document.addEventListener('DOMContentLoaded', updateHeight);
      window.addEventListener('load', updateHeight);
      updateHeight();

      // Notify when content is fully loaded
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'loaded'
      }));
    })();
  `;

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      
      if (data.type === 'height' && data.height > 0) {
        setContentHeight(data.height);
      } else if (data.type === 'loaded') {
        setIsLoading(false);
        onContentLoad?.();
      }
    } catch (error) {
      console.error('Error parsing WebView message:', error);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        originWhitelist={['*']}
        style={[
          styles.webview,
          { height: contentHeight || 1 }
        ]}
        injectedJavaScript={injectedJavaScript}
        onMessage={handleMessage}
        javaScriptEnabled={true}
      />
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator color="#3B82F6" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  webview: {
    backgroundColor: 'transparent',
    opacity: 1,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});