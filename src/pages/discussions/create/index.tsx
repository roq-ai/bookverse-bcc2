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

import { createDiscussion } from 'apiSdk/discussions';
import { discussionValidationSchema } from 'validationSchema/discussions';
import { UserInterface } from 'interfaces/user';
import { BookInterface } from 'interfaces/book';
import { getUsers } from 'apiSdk/users';
import { getBooks } from 'apiSdk/books';
import { DiscussionInterface } from 'interfaces/discussion';

function DiscussionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: DiscussionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createDiscussion(values);
      resetForm();
      router.push('/discussions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<DiscussionInterface>({
    initialValues: {
      topic: '',
      is_closed: false,
      user_id: (router.query.user_id as string) ?? null,
      book_id: (router.query.book_id as string) ?? null,
    },
    validationSchema: discussionValidationSchema,
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
              label: 'Discussions',
              link: '/discussions',
            },
            {
              label: 'Create Discussion',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Discussion
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.topic}
            label={'Topic'}
            props={{
              name: 'topic',
              placeholder: 'Topic',
              value: formik.values?.topic,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="is_closed" display="flex" alignItems="center" mb="4" isInvalid={!!formik.errors?.is_closed}>
            <FormLabel htmlFor="switch-is_closed">Is Closed</FormLabel>
            <Switch
              id="switch-is_closed"
              name="is_closed"
              onChange={formik.handleChange}
              value={formik.values?.is_closed ? 1 : 0}
            />
            {formik.errors?.is_closed && <FormErrorMessage>{formik.errors?.is_closed}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<BookInterface>
            formik={formik}
            name={'book_id'}
            label={'Select Book'}
            placeholder={'Select Book'}
            fetcher={getBooks}
            labelField={'title'}
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
              onClick={() => router.push('/discussions')}
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
    entity: 'discussion',
    operation: AccessOperationEnum.CREATE,
  }),
)(DiscussionCreatePage);
