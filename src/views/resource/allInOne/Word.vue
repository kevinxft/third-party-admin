<template>
  <ResourceLayout database="allInOne" name="word" :columns="columns" />
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import ResourceLayout from './../ResourceLayout.vue';

  const columns = reactive([
    {
      title: '词典Id',
      dataIndex: 'dictId',
      width: 200,
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
      dataIndex: 'sentences',
    },
    {
      title: '近义',
      dataIndex: 'rels',
    },
  ]);
</script>
