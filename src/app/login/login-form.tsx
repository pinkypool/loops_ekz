'use client'

import { login } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginForm({ error }: { error?: string }) {
  return (
    <form action={login} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="fullname">Имя и Фамилия</Label>
        <Input
          id="fullname"
          name="fullname"
          type="text"
          placeholder="Например: Акаш Ильяс"
          required
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" className="w-full">
        Войти
      </Button>
    </form>
  )
}
