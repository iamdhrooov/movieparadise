import {client} from '../index';

// Add redis caching
const setReqData = async (key: string, data: string) => {
  return await client.set(key, data);
};

const getReqData = async (key: string) => {
  return await client.get(key);
};

export {setReqData, getReqData};
