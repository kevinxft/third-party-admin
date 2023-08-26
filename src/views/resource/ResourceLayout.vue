<template>
  <BasicTable
    @register="registerTable"
    :pagination="{
      defaultPageSize: 20,
      pageSize: 20,
    }"
  >
    <template #form-custom> <slot name="search"></slot> </template>
    <template #bodyCell="cellData">
      <slot name="cell" v-bind="{ ...cellData, methods: { reload } }"> </slot>
      <template v-if="actions.length > 0 && cellData.column.key === 'action'">
        <TableAction :actions="createActions(cellData.record)" />
      </template>
    </template>
    <template #toolbar>
      <create-form
        :database="props.database"
        :table="props.table"
        :columns="columns"
        :reload="reload"
      />
      <slot name="toolbar"></slot>
    </template>
  </BasicTable>
</template>

<script setup lang="ts">
  import { BasicTable, useTable, TableAction, ActionItem } from '/@/components/Table';
  import CreateForm from './CreateForm.vue';
  import { getList, deleteOne, updateOne } from '../../api/resource';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { cloneDeep } from 'lodash-es';
  import { ref } from 'vue';

  const cols = ref<any[]>([]);
  const currentEditKeyRef = ref('');
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
      required: true,
    },
    actions: {
      type: Array<string>,
      default: ['delete', 'edit'],
    },
  });

  const getTableData = async (params) => {
    params = Object.keys(params).reduce((acc, key) => {
      if (params[key] !== undefined) {
        acc[key] = params[key];
      }
      return acc;
    }, {});
    const res = await getList(props.database, props.table, params);
    return res;
  };

  const createActions = (record): ActionItem[] => {
    if (record.editable) {
      return [
        {
          label: '保存',
          onClick: async () => {
            try {
              msg.loading({ content: '保存中...', key: 'saving' });
              const data = cloneDeep(record.editValueRefs);
              await updateOne(props.database, props.table, record.id, data);
              currentEditKeyRef.value = '';
              record.onEdit?.(false, true);
              msg.success({ content: '保存成功', key: 'saving' });
            } catch (error) {
              msg.error({ content: '更新失败', key: 'saving' });
            }
          },
        },
        {
          label: '取消',
          onClick: () => record.onEdit?.(false),
        },
      ];
    } else {
      return [
        {
          label: '删除',
          icon: 'ic:outline-delete-outline',
          popConfirm: {
            title: '是否删除',
            confirm: async () => {
              await deleteOne(props.database, props.table, record.id);
              reload();
            },
          },
          color: 'error',
        },
        {
          label: '编辑',
          icon: 'ic:outline-edit',
          disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
          onClick: () => {
            console.log('edit');
            record.onEdit?.(true);
          },
        },
      ];
    }
  };

  const getSearchFileds = () => {
    return props.columns
      .filter((col) => !!col.search)
      .map((item) => {
        const { title, dataIndex, component = 'Input' } = item;
        return {
          label: title,
          field: dataIndex,
          component,
        };
      });
  };

  cols.value = getSearchFileds();

  const [registerTable, { reload }] = useTable({
    useSearchForm: cols.value.length > 0,
    rowKey: 'id',
    columns: props.columns,
    api: getTableData,
    onColumnsChange: () => console.log('hanldeColumn'),
    tableSetting: { fullScreen: true },
    formConfig: {
      schemas: cols.value,
    },
    actionColumn: {
      width: 160,
      title: '操作',
      dataIndex: 'action',
    },
  });

  defineExpose({ reload });
</script>
