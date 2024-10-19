import { useRouter } from "next/navigation";

export default function Home() {

  const route = useRouter()
  return (


    <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <h2 className="text-center">Exemplo de Métricas</h2>

      <div className="flex items-center justify-center">

        <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700"
          onClick={() => route.push('/metrics')}>
          Metrics
        </button>
        
      </div>
      
    </div>
  );
}
