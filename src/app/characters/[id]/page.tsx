import { Character, Episode } from '@/types/rickandmorty'
import Link from 'next/link'
import Image from 'next/image'
import './character-detail.css'
import DataTable, { ColumnType } from '@/components/DataTable'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'

async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    notFound()
  }

  return res.json()
}

async function getEpisodes(episodeUrls: string[]): Promise<Episode[]> {
  const episodeIds = episodeUrls.map(url => url.split('/').pop()).join(',')
  
  const res = await fetch(`https://rickandmortyapi.com/api/episode/${episodeIds}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    return []
  }

  const data = await res.json()
  return Array.isArray(data) ? data : [data]
}

interface CharacterDetailPageProps {
  params: {
    id: string
  }
}

export default async function CharacterDetailPage({ params }: CharacterDetailPageProps) {
  const character = await getCharacter(params.id)
  const episodes = await getEpisodes(character.episode)

  const episodeColumns: ColumnType<Episode>[] = [
    {
      key: 'episode',
      header: 'Episode',
      width: '20%',
    },
    {
      key: 'name',
      header: 'Name',
      width: '60%',
      isPrimary: true,
    },
    {
      key: 'air_date',
      header: 'Air Date',
      width: '20%',
      render: (air_date) => format(new Date(air_date as string), 'MMMM d, yyyy'),
    }
  ];

  return (
    <div className="character-detail-container">
      <div className="breadcrumb">
        <Link href="/characters">Characters</Link>
        <span>/</span>
        <span>{character.name}</span>
      </div>

      <div className="character-card">
        <div className="character-card-image">
          <Image
            src={character.image}
            alt={character.name}
            width={300}
            height={300}
            className="character-image"
          />
        </div>
        <div className="character-card-info">
          <h1 className="character-name">{character.name}</h1>
          <div className="character-meta">
            <p><strong>Species:</strong> {character.species}</p>
            <p><strong>Type:</strong> {character.type || 'Not available'}</p>
            <p><strong>Status:</strong> {character.status}</p>
            <p><strong>Gender:</strong> {character.gender}</p>
            <p><strong>Origin:</strong> {character.origin.name}</p>
            <p><strong>Last Known Location:</strong> {character.location.name}</p>
          </div>
        </div>
      </div>

        <h2 className="episodes-title">Episodes</h2>
        <DataTable
          data={episodes}
          columns={episodeColumns}
          keyField="id"
        />
    </div>
  )
}
