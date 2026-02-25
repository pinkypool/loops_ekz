import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoginForm } from './login-form'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams;
  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Вход на платформу</CardTitle>
          <CardDescription>
            Введите свое имя и фамилию для доступа к урокам.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm error={error} />
        </CardContent>
      </Card>
    </div>
  )
}
