import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Account, Tag, AccountType } from '@/types'

const STORAGE_KEY = 'vue-accounts-manager'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  /** Загрузка данных из localStorage при загрузке страницы */
  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        accounts.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Ошибка загрузки данных из localStorage:', error)
    }
  }

  /** Сохранение данных в localStorage */
  const saveToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts.value))
    } catch (error) {
      console.error('Ошибка сохранения данных в localStorage:', error)
    }
  }

  /** Создание учетной записи */
  const createAccount = (): Account => {
    return {
      id: `account_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      tags: [],
      type: 'Локальная',
      login: '',
      password: '',
    }
  }

  /** Преобразование строки меток в массив объектов */
  const parseTagsFromString = (tagsString: string): Tag[] => {
    if (!tagsString.trim()) return []

    return tagsString
      .split(';')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
      .map(tag => ({ text: tag }))
  }

  /** Преобразование массива меток в строку */
  const stringifyTags = (tags: Tag[]): string => {
    return tags.map(tag => tag.text).join('; ')
  }

  /** Добавление новой учетной записи */
  const addAccount = () => {
    const newAccount = createAccount()
    accounts.value.push(newAccount)
    saveToStorage()
    return newAccount
  }

  /** Обновление учетной записи */
  const updateAccount = (
    accountId: string,
    updates: {
      tagsInput?: string
      type?: AccountType
      login?: string
      password?: string
    },
  ) => {
    const accountIndex = accounts.value.findIndex(acc => acc.id === accountId)
    if (accountIndex === -1) return

    const account = accounts.value[accountIndex]

    if (updates.tagsInput !== undefined) {
      account.tags = parseTagsFromString(updates.tagsInput)
    }

    if (updates.type !== undefined) {
      account.type = updates.type
    }

    if (updates.login !== undefined) {
      account.login = updates.login
    }

    if (updates.password !== undefined) {
      account.password = updates.type === 'LDAP' ? null : updates.password
    }

    // при LDAP обнуляем пароль
    if (account.type === 'LDAP') {
      account.password = null
    }

    saveToStorage()
  }

  /** Удаление учетной записи */
  const removeAccount = (accountId: string) => {
    const accountIndex = accounts.value.findIndex(acc => acc.id === accountId)
    if (accountIndex !== -1) {
      accounts.value.splice(accountIndex, 1)
      saveToStorage()
    }
  }

  /** Валидация учетной записи */
  const validateAccount = (account: Account): boolean => {
    if (!account.login.trim()) return false

    if (account.type === 'Локальная' && !account.password?.trim()) return false

    return true
  }

  /** Получение учетной записи по ID */
  const getAccountById = (id: string) => {
    return accounts.value.find(acc => acc.id === id)
  }

  /** Геттер для количества учетных записей*/
  const accountsCount = computed(() => accounts.value.length)

  /** Инициализация данных при создании store*/
  loadFromStorage()

  return {
    accounts,
    accountsCount,
    addAccount,
    updateAccount,
    removeAccount,
    validateAccount,
    getAccountById,
    stringifyTags,
    parseTagsFromString,
  }
})
