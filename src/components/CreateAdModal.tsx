import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import axios from 'axios';

import { Input } from './Form/Input';
import { Check, GameController } from 'phosphor-react';
import { useEffect, useState, FormEvent } from 'react';
import { GroupToggle } from './GroupToggle';
import { useFetch } from '../hook/useFetch';

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [games, setGames] = useState<Game[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)
    const { data } = useFetch('http://localhost:3333/games');

    useEffect(() => {
      if(data) {
        setGames(data)
      }
    },[data])

    async function handleCreateAd(event: FormEvent) {
      event.preventDefault();

      const formData = new FormData(event.target as HTMLFormElement);
      const res = Object.fromEntries(formData);
      console.log(res)

      if(!res.name) {
        return;
      }
      
     try {
        await axios.post(`http://localhost:3333/games/${res.game}/ads`, {
          name: res.name,
          yearsPlaying: Number(res.yearsPlaying),
          discord: res.discord,
          weekDays: weekDays.map(Number),
          hourStart: res.hourStart,
          hourEnd: res.hourEnd,
          useVoiceChannel: useVoiceChannel
        });
        
        alert('Anúncio criado com sucesso');
     } catch (error) {
        console.error(error)
        alert('Erro ao criar o anúncio');
     }

    }

    function handleChecked(checked: boolean | string) {
      if(checked === true) {
        setUseVoiceChannel(true)
      } else {
        setUseVoiceChannel(false)
      }
    }

    return (
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>

          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25'>
            <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

            <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <label className='font-semibold' htmlFor='game'>Qual o game?</label>
                <select 
                    name='game'
                    className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
                    id='game' 
                    defaultValue=""
                >
                    <option disabled value="">Selecione o game que deseja jogar</option>

                    {games.map(game => {
                       return <option key={game.id} value={game.id}>{game.title}</option>
                    })}
                    
                </select>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='name'>Seu nome (ou nickname)</label>
              <Input name='name' id='name' placeholder='Como te chamam dentro do game?'/>
            </div>

            <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
                <Input name='yearsPlaying' id='yearsPlaying' type='number' placeholder='Tudo bem ser ZERO' />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='discord'>Qual o seu discord?</label>
                <Input name='discord' id='discord' type='text' placeholder='Usuario#0000'/>
              </div>
            </div>

            <div className='flex gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='weekDays'>Quando constuma jogar?</label>

                <ToggleGroup.Root 
                    className='grid grid-cols-4 gap-2' 
                    type='multiple'
                    value={weekDays}
                    onValueChange={setWeekDays}
                >      
                            
                    <GroupToggle value={weekDays} />
                </ToggleGroup.Root>
                
              </div>
              <div className='flex flex-col gap-2 flex-1'>
                <label htmlFor='hourStart'>Qual horário do dia?</label>
                <div className='grid grid-cols-2 gap-2'>
                  <Input name='hourStart' id='hourStart' type='time' placeholder='De'/>
                  <Input name='hourEnd' id='hourEnd' type='time' placeholder='Até'/>
                </div>
              </div>
            </div>

            <label className='mt-2 flex items-center gap-2 text-sm'>
                <Checkbox.Root 
                  checked={useVoiceChannel}
                  onCheckedChange={(checked) => handleChecked(checked)}
                  className='w-6 h-6 p-1 rounded bg-zinc-900'
                >
                    <Checkbox.Indicator>
                        <Check className='w-4 h-4 text-emerald-400' />
                    </Checkbox.Indicator>
                </Checkbox.Root>
              Constumo me conectar ao chat de voz
            </label>

            <footer className='mt-4 flex justify-end gap-4'>
              <Dialog.Close 
                type='button' 
                className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'
              >
                  Cancelar
              </Dialog.Close>
              <button className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600' type='submit'>
                <GameController className='w-6 h-6' />
                Encontrar duo
              </button>
            </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
    )
}