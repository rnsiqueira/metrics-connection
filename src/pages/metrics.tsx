import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import { request } from '@/components/utils/http_utils';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })


function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}


const Metrics = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    request.get('/products').then((response) => {
      setProducts(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  const names = removeDuplicates(products.map((p) => p.name))
  const dates = removeDuplicates(products.map((p) => p.arrived).sort())



  const optionsLinha: ApexOptions = {

    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: 'Produtos acumulados',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      type: 'datetime',
      categories: dates,

    },
    markers: {
      size: 0
    }

  }


  const seriesLines = names.map((name) => {
    return {
      name: name,
      data: dates.map((date) => {
        return products.filter((p) => p.name === name && p.arrived === date).length
      })
    }
  })


  const optionsBar: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: 30


      }
    },
    dataLabels: {
      enabled: true
    },
    xaxis: {
      categories: names,
    }
  }

  const seriesBar = [
    {
      data: names.map((name) => {
        return products.filter((p) => p.name === name).length
      })
    }]


  const donetOptions: ApexOptions = {
    chart: {
      type: 'donut',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }

  const seriesDonet = names.map((name) => {
    return products.filter((p) => p.name === name).length
  })


  return (
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Exemplo de métricas </h1>
        </div>
      </header>
      <div className="items-center">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descrição
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chegada
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((p, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(p.price)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.arrived}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard Linha</h1>
        </div>
      </header>
      <main>
        <div>

        </div>
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
          <Chart options={optionsLinha} series={seriesLines} />
        </div>
      </main >
      <header className="bg-white shadow">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard BAR</h1>
        </div>
      </header>
      <main>
        <div>

        </div>
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
          <Chart options={optionsBar} series={seriesBar} type='bar' />
        </div>
      </main >


      <header className="bg-white shadow">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard Dunet</h1>
        </div>
      </header>
      <main>
        <div>

        </div>
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
          <Chart options={donetOptions} series={seriesDonet} type='donut' />
        </div>
      </main >

    </div >
  );


}

export default Metrics;