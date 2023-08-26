import * as yup from 'yup';

export const collectionValidationSchema = yup.object().shape({
  name: yup.string().required(),
  is_public: yup.boolean().required(),
  user_id: yup.string().nullable().required(),
});
