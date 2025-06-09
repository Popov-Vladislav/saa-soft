<template>
  <div class="account-form">
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Метка</label>
        <el-input
          v-model="formData.tagsInput"
          placeholder="Введите метки через ;"
          maxlength="50"
          show-word-limit
          class="form-input"
          @blur="handleTagsBlur"
        />
      </div>
      <div class="form-group">
        <label class="form-label">Тип записи</label>
        <el-select
          v-model="formData.type"
          placeholder="Выберите тип"
          class="form-select"
          @change="handleTypeChange"
        >
          <el-option
            label="LDAP"
            value="LDAP" />
          <el-option
            label="Локальная"
            value="Локальная" />
        </el-select>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label class="form-label required">Логин</label>
        <el-input
          v-model="formData.login"
          placeholder="Введите логин"
          maxlength="100"
          show-word-limit
          :class="{ 'error': errors.login }"
          class="form-input"
          @blur="handleLoginBlur"
        />
      </div>
      <div
        v-if="formData.type === 'Локальная'"
        class="form-group">
        <label class="form-label required">Пароль</label>
        <el-input
          v-model="formData.password"
          type="password"
          placeholder="Введите пароль"
          maxlength="100"
          show-word-limit
          :class="{ 'error': errors.password }"
          class="form-input"
          @blur="handlePasswordBlur"
        />
      </div>
    </div>

    <div class="form-actions">
      <el-button
        type="danger"
        :icon="Delete"
        class="delete-button"
        @click="handleDelete"
      >
        Удалить
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, onMounted } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import { useAccountsStore } from '@/stores/accounts'
import type { Account, AccountFormData, ValidationErrors } from '@/types'

const props = defineProps<{
  account: Account
}>()

const emit = defineEmits<{
  delete: [accountId: string]
}>()

const accountsStore = useAccountsStore()

const formData = reactive<AccountFormData>({
  id: props.account.id,
  tagsInput: '',
  type: props.account.type,
  login: props.account.login,
  password: props.account.password || '',
})

const errors = reactive<ValidationErrors>({
  login: false,
  password: false,
})

onMounted(() => {
  formData.tagsInput = accountsStore.stringifyTags(props.account.tags)
})

const validateField = (field: keyof ValidationErrors): boolean => {
  switch (field) {
  case 'login':
    errors.login = !formData.login.trim()
    return !errors.login
  case 'password':
    errors.password = formData.type === 'Локальная' && !formData.password.trim()
    return !errors.password
  default:
    return true
  }
}

const validateForm = (): boolean => {
  const loginValid = validateField('login')
  const passwordValid = validateField('password')
  return loginValid && passwordValid
}

const handleTagsBlur = () => {
  accountsStore.updateAccount(props.account.id, {
    tagsInput: formData.tagsInput,
  })
}

const handleTypeChange = () => {
  errors.password = false

  accountsStore.updateAccount(props.account.id, {
    type: formData.type,
    password: formData.password,
  })

  if (formData.type === 'LDAP') {
    formData.password = ''
  }

  validateForm()
}

const handleLoginBlur = () => {
  validateField('login')

  if (!errors.login) {
    accountsStore.updateAccount(props.account.id, {
      login: formData.login,
    })
  }
}

const handlePasswordBlur = () => {
  validateField('password')

  if (!errors.password) {
    accountsStore.updateAccount(props.account.id, {
      password: formData.password,
    })
  }
}

const handleDelete = () => {
  emit('delete', props.account.id)
}

watch(
  () => props.account,
  (newAccount) => {
    formData.tagsInput = accountsStore.stringifyTags(newAccount.tags)
    formData.type = newAccount.type
    formData.login = newAccount.login
    formData.password = newAccount.password || ''
  },
  { deep: true },
)
</script>

<style scoped>
.account-form {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  background-color: #ffffff;
}

.form-row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.form-group {
  flex: 1;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #303133;
  font-size: 14px;
}

.form-label.required::after {
  content: " *";
  color: #f56c6c;
}

.form-input,
.form-select {
  width: 100%;
}

.form-input.error :deep(.el-input__wrapper) {
  border-color: #f56c6c;
  box-shadow: 0 0 0 1px #f56c6c inset;
}

.form-input.error :deep(.el-input__wrapper):hover {
  border-color: #f56c6c;
}

.form-input.error :deep(.el-input__wrapper.is-focus) {
  border-color: #f56c6c;
  box-shadow: 0 0 0 1px #f56c6c inset;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.delete-button {
  min-width: 100px;
}
</style>
