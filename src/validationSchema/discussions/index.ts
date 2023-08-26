import * as yup from 'yup';

export const discussionValidationSchema = yup.object().shape({
  topic: yup.string().required(),
  is_closed: yup.boolean().required(),
  user_id: yup.string().nullable().required(),
  book_id: yup.string().nullable().required(),
});
