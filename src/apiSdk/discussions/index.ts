import axios from 'axios';
import queryString from 'query-string';
import { DiscussionInterface, DiscussionGetQueryInterface } from 'interfaces/discussion';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getDiscussions = async (
  query?: DiscussionGetQueryInterface,
): Promise<PaginatedInterface<DiscussionInterface>> => {
  const response = await axios.get('/api/discussions', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createDiscussion = async (discussion: DiscussionInterface) => {
  const response = await axios.post('/api/discussions', discussion);
  return response.data;
};

export const updateDiscussionById = async (id: string, discussion: DiscussionInterface) => {
  const response = await axios.put(`/api/discussions/${id}`, discussion);
  return response.data;
};

export const getDiscussionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/discussions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDiscussionById = async (id: string) => {
  const response = await axios.delete(`/api/discussions/${id}`);
  return response.data;
};
