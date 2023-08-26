<template>
  <div>
    <a-button @click="openModal" v-if="schemas.length > 0">新增</a-button>
    <BasicModal
      v-bind="$attrs"
      okText="保存"
      @ok="onCreate"
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
  import { createOne } from '../../api/resource';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { computed } from 'vue';

  const { createMessage: msg } = useMessage();

  const props = defineProps({
    database: {
      type: String,
      required: true,
    },
    table: {
      type: String,
      required: true,
    },
    columns: {
      type: Array<any>,
      default: () => [],
    },
    reload: {
      type: Function,
      default: () => {},
    },
  });

  const schemas = computed<FormSchema[]>(() => {
    const res = props.columns.reduce((acc, cur) => {
      if (cur.editRow || cur.createRow) {
        acc.push(cur);
      }
      return acc;
    }, []);
    return res.map((item) => ({
      field: item.dataIndex,
      component: item.component || 'Input',
      label: item.title,
    }));
  });

  const [registerModal, { openModal, closeModal }] = useModal();
  const [registerForm, { getFieldsValue }] = useForm({
    schemas,
  });

  const onCreate = async () => {
    msg.loading({ content: '创建中...', key: 'create' });
    try {
      await createOne(props.database, props.table, getFieldsValue());
      console.log(getFieldsValue());
      msg.success({ content: 'onCreate', key: 'create' });
      props.reload();
      closeModal();
    } catch (error) {
      msg.error({ content: '创建失败', key: 'create' });
    }
  };
</script>
