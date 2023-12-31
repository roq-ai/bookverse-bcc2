import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createBook } from 'apiSdk/books';
import { bookValidationSchema } from 'validationSchema/books';
import { PublisherInterface } from 'interfaces/publisher';
import { getPublishers } from 'apiSdk/publishers';
import { BookInterface } from 'interfaces/book';

function BookCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: BookInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createBook(values);
      resetForm();
      router.push('/books');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<BookInterface>({
    initialValues: {
      title: '',
      author: '',
      published_date: new Date(new Date().toDateString()),
      isbn: '',
      genre: '',
      publisher_id: (router.query.publisher_id as string) ?? null,
    },
    validationSchema: bookValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Books',
              link: '/books',
            },
            {
              label: 'Create Book',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Book
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.title}
            label={'Title'}
            props={{
              name: 'title',
              placeholder: 'Title',
              value: formik.values?.title,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.author}
            label={'Author'}
            props={{
              name: 'author',
              placeholder: 'Author',
              value: formik.values?.author,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="published_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Published Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.published_date ? new Date(formik.values?.published_date) : null}
              onChange={(value: Date) => formik.setFieldValue('published_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.isbn}
            label={'Isbn'}
            props={{
              name: 'isbn',
              placeholder: 'Isbn',
              value: formik.values?.isbn,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.genre}
            label={'Genre'}
            props={{
              name: 'genre',
              placeholder: 'Genre',
              value: formik.values?.genre,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<PublisherInterface>
            formik={formik}
            name={'publisher_id'}
            label={'Select Publisher'}
            placeholder={'Select Publisher'}
            fetcher={getPublishers}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/books')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'book',
    operation: AccessOperationEnum.CREATE,
  }),
)(BookCreatePage);
