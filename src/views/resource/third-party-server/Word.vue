<template>
  <ResourceLayout name="word" :columns="columns" />
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import ResourceLayout from './../ResourceLayout.vue';

  const columns = reactive([
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
    },
    {
      title: 'BookId',
      dataIndex: 'bookId',
    },
    {
      title: '单词',
      dataIndex: 'name',
    },
    {
      title: '美英',
      dataIndex: 'usphone',
    },
    {
      title: '英英',
      dataIndex: 'ukphone',
    },
    {
      title: '翻译',
      dataIndex: 'trans',
    },
    {
      title: '短语',
      dataIndex: 'phrases',
    },
    {
      title: '近义词',
      dataIndex: 'synos',
    },
  ]);
</script>
