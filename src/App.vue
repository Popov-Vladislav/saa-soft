<template>
  <div class="app">
    <div class="container">
      <div class="header">
        <h1 class="title">Управление учетными записями</h1>
        <el-button
          type="primary"
          :icon="Plus"
          class="add-button"
          @click="addNewAccount"
        >
          Добавить учетную запись
        </el-button>
      </div>

      <div class="hint">
        <el-alert
          title="Подсказка"
          description="В поле 'Метка' вводите текстовые метки через знак ';' (точка с запятой). Например: работа; проект; важное"
          type="info"
          :closable="false"
          class="hint-alert"
        />
      </div>

      <div class="accounts-section">
        <div
          v-if="accountsStore.accounts.length === 0"
          class="empty-state">
          <el-empty description="Нет учетных записей">
            <el-button
              type="primary"
              @click="addNewAccount">
              Создать первую учетную запись
            </el-button>
          </el-empty>
        </div>

        <div
          v-else
          class="accounts-list">
          <h3 class="section-title">
            Список учетных записей ({{ accountsStore.accountsCount }})
          </h3>

          <AccountForm
            v-for="account in accountsStore.accounts"
            :key="account.id"
            :account="account"
            @delete="handleDeleteAccount"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { useAccountsStore } from '@/stores/accounts'
import AccountForm from '@/components/AccountForm.vue'

const accountsStore = useAccountsStore()

const addNewAccount = () => {
  accountsStore.addAccount()
}

const handleDeleteAccount = async (accountId: string) => {
  try {
    await ElMessageBox.confirm(
      'Вы уверены, что хотите удалить эту учетную запись?',
      'Подтверждение удаления',
      {
        confirmButtonText: 'Удалить',
        cancelButtonText: 'Отмена',
        type: 'warning',
      },
    )

    accountsStore.removeAccount(accountId)
  } catch {
    // todo доделать логику, когда пользователь отменил удаление
  }
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  margin: 0;
  color: #303133;
  font-size: 28px;
  font-weight: 600;
}

.add-button {
  min-width: 200px;
  height: 40px;
  font-size: 16px;
}

.hint {
  margin-bottom: 24px;
}

.hint-alert {
  border-radius: 8px;
}

.accounts-section {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-title {
  margin: 0 0 24px 0;
  color: #303133;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 2px solid #e4e7ed;
  padding-bottom: 12px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
}

:deep(.el-alert) {
  border-radius: 8px;
}

:deep(.el-button) {
  border-radius: 6px;
  font-weight: 500;
}

:deep(.el-input__wrapper) {
  border-radius: 6px;
}

:deep(.el-select) {
  width: 100%;
}

:deep(.el-select .el-input__wrapper) {
  border-radius: 6px;
}
</style>
