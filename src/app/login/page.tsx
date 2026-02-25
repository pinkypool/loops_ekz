import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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
            Введите данные, выданные преподавателем, для доступа к урокам.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm error={error} />
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 text-sm text-muted-foreground">
           Если у вас нет пароля, запросите его.
        </CardFooter>
      </Card>
    </div>
  )
}
