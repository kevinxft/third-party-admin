<template>
  <div>
    <a-button @click="onShowModal">编辑</a-button>
    <BasicModal
      v-bind="$attrs"
      okText="修改"
      @ok="onUpdate"
      @register="registerModal"
      :maskClosable="false"
    >
      <BasicForm
        class="flex"
        @register="registerForm"
        :showSubmitButton="false"
        :showResetButton="false"
      />
    </BasicModal>
  </div>
</template>

<script setup lang="ts">
  import { BasicModal, useModal } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { updateDict } from '/@/api/resource';

  const schemas: FormSchema[] = [
    {
      field: 'name',
      component: 'Input',
      label: '词典名称',
    },
  ];

  const [registerForm, { setFieldsValue, getFieldsValue }] = useForm({
    schemas,
  });

  const props = defineProps({
    data: Object,
  });

  async function onShowModal() {
    await openModal();
    await setFieldsValue({ name: props.data?.record?.name });
  }

  async function onUpdate() {
    await updateDict({
      bookId: props.data?.record.dictId,
      name: getFieldsValue()['name'],
    });
    await props.data?.methods.reload();
    await closeModal();
  }

  const [registerModal, { openModal, closeModal }] = useModal();
</script>
