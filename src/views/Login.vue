<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { FormControl, FormField, FormLabel, FormItem } from '@/components/ui/form';

const formSchema = toTypedSchema(z.object({
  password: z.string().min(8),
  email: z.string().email(),
}));

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((val) => {
  console.log(val);
});
</script>

<template>
  <main class="h-screen w-screen flex items-center justify-center">
    <Card class="max-w-[320px] md:max-w-[400px] w-full">
      <CardHeader>
        <CardTitle class="text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem class="mb-4">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="example@mail.com" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <div class="flex items-center space-x-2 mt-4">
            <Checkbox id="terms" />
            <Label for="terms">Remember Me</Label>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div class="w-full">
          <Button class="w-full" @click="onSubmit">Login</Button>
          <div class="relative my-4">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div class="grid gap-4 grid-cols-2">
            <Button variant="outline" prepend-icon="GithubIcon" class="w-full">
              Github
            </Button>
            <Button variant="outline" prepend-icon="Gitlab" class="w-full">
              Gitlab
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  </main>
</template>