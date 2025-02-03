import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {fetchBloggers} from '../../store/blog';
import BloggersMap from './blogger-map';

const Map = () => {
  const dispatch = useDispatch<any>();
  const [bloggers, setBloggers] = useState([]);
  const fetchAllBloggers = async () => {
    try {
      const {payload} = await dispatch(fetchBloggers({}));
      if (payload.data.success) {
        setBloggers(payload.data.data);
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllBloggers();
  }, []);

  return (
    <View>
      <BloggersMap bloggers={bloggers} />
    </View>
  );
};

export default Map;
