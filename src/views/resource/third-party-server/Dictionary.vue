<template>
  <ResourceLayout name="dictionary" :columns="columns" />
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import ResourceLayout from './../ResourceLayout.vue';

  const columns = reactive([
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'bookId',
      dataIndex: 'bookId',
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
  ]);
</script>
