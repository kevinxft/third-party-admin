<template>
  <ResourceLayout database="wordChips" name="userWord" :columns="columns" />
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import ResourceLayout from './../ResourceLayout.vue';

  const columns = reactive([
    {
      title: 'BookId',
      dataIndex: 'bookId',
    },
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: '熟悉等级',
      dataIndex: 'level',
    },
    {
      title: '查询次数',
      dataIndex: 'searchTimes',
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
