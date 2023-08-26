import * as yup from 'yup';

export const bookValidationSchema = yup.object().shape({
  title: yup.string().required(),
  author: yup.string().required(),
  published_date: yup.date().required(),
  isbn: yup.string().required(),
  genre: yup.string().required(),
  publisher_id: yup.string().nullable().required(),
});
