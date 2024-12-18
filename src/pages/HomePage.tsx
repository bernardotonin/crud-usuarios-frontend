import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex items-center justify-center h-[80vh] font-[family-name:var(--font-geist-sans)]">

      <div className="p-12 rounded-md flex items-center flex-col gap-4 shadow-gray-400 shadow-xl">
          <h1>Cadastro de usuários</h1>

        <Button className='px-8 py-6' asChild>
          <Link href='/users'>Começar</Link>
        </Button>
      </div>
    </div>
  );
}
