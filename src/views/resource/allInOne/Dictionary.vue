<template>
  <div>
    <div class="flex mx4 mt4 p2 bg-white">
      <a-button class="ml-auto" @click="onShowModal">新增</a-button>
      <BasicModal
        v-bind="$attrs"
        okText="新增"
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
    <ResourceLayout ref="resource" database="allInOne" name="dictionary" :columns="columns">
      <template #cell="data">
        <template v-if="data.column.key === 'operation'">
          <div class="flex">
            <EditDictionary class="mr4" :data="data" />
            <UploadDict :data="data" />
          </div>
        </template>
      </template>
    </ResourceLayout>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import ResourceLayout from './../ResourceLayout.vue';
  import UploadDict from './UploadDict.vue';
  import EditDictionary from './DictionaryForm.vue';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { addDict } from '/@/api/resource';

  const resource = ref();

  const columns = reactive([
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'dictId',
      dataIndex: 'dictId',
    },
    {
      title: '字典',
      dataIndex: 'name',
    },
    {
      title: '单词数量',
      dataIndex: 'count',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
    {
      title: '修改时间',
      dataIndex: 'updatedAt',
    },
    {
      title: '操作',
      key: 'operation',
    },
  ]);

  const schemas: FormSchema[] = [
    {
      field: 'name',
      component: 'Input',
      label: '词典名称',
    },
    {
      field: 'dictId',
      component: 'Input',
      label: '词典ID',
    },
  ];

  const [registerForm, { getFieldsValue, setFieldsValue }] = useForm({
    schemas,
  });

  async function onShowModal() {
    await openModal();
  }

  async function onCreate() {
    await addDict(getFieldsValue());
    await setFieldsValue({ name: '', dictId: '' });
    await closeModal();
    resource.value.reload();
  }

  const [registerModal, { openModal, closeModal }] = useModal();
</script>
