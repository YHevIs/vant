import { mountForm, submitForm, mountSimpleRulesForm } from './shared';

test('submit event', async () => {
  const onSubmit = jest.fn();
  const wrapper = mountForm({
    template: `
      <van-form @submit="onSubmit">
        <van-field name="A" value="bar" />
        <van-button native-type="submit" />
      </van-form>
    `,
    methods: {
      onSubmit,
    },
  });

  await submitForm(wrapper);

  expect(onSubmit).toHaveBeenCalledWith({ A: 'bar' });
});

test('failed event', async () => {
  const onFailed = jest.fn();
  const wrapper = mountSimpleRulesForm({
    methods: {
      onFailed,
    },
  });

  await submitForm(wrapper);

  expect(wrapper).toMatchSnapshot();
  expect(onFailed).toHaveBeenCalledWith({
    errors: [
      { name: 'A', message: 'A failed' },
      { name: 'B', message: 'B failed' },
    ],
    values: { A: '', B: '' },
  });
});
