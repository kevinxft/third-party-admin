<template>
  <ResourceLayout ref="resource" database="allInOne" table="dictionary" :columns="columns">
    <template #cell="data">
      <template v-if="data.column.key === 'operation'">
        <UploadDict :data="data" />
      </template>
    </template>
  </ResourceLayout>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import ResourceLayout from './../ResourceLayout.vue';
  import UploadDict from './common/UploadDict.vue';

  const resource = ref();

  const columns = reactive([
    {
      title: '词典ID',
      dataIndex: 'dictId',
      createRow: true,
    },
    {
      title: '词典名称',
      dataIndex: 'name',
      editRow: true,
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
      title: '管理',
      key: 'operation',
    },
  ]);
</script>
