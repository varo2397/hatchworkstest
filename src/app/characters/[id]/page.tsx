import { Character } from '@/types/rickandmorty'
import Link from 'next/link'
import './character-detail.css'

async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch character')
  }

  return res.json()
}

async function getEpisodes(episodeUrls: string[]): Promise<any[]> {
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

  return (
    <div className="character-detail-container">
      <div className="back-navigation">
        <Link href="/characters" className="back-button">
          ← Back to Characters
        </Link>
      </div>

      <div className="character-detail-content">
        <div className="character-hero">
          <div className="character-image-large">
            <img
              src={character.image}
              alt={character.name}
              className="hero-image"
            />
            <div className={`status-badge-large status-${character.status.toLowerCase()}`}>
              {character.status}
            </div>
          </div>
          
          <div className="character-basic-info">
            <h1 className="character-title">{character.name}</h1>
            <div className="character-subtitle">
              <span className="species">{character.species}</span>
              {character.type && <span className="type"> • {character.type}</span>}
            </div>
          </div>
        </div>

        <div className="character-details-grid">
          <div className="detail-section">
            <h2 className="section-title">Personal Information</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">ID</span>
                <span className="detail-value">#{character.id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Name</span>
                <span className="detail-value">{character.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status</span>
                <span className={`detail-value status-text status-${character.status.toLowerCase()}`}>
                  {character.status}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Species</span>
                <span className="detail-value">{character.species}</span>
              </div>
              {character.type && (
                <div className="detail-item">
                  <span className="detail-label">Type</span>
                  <span className="detail-value">{character.type}</span>
                </div>
              )}
              <div className="detail-item">
                <span className="detail-label">Gender</span>
                <span className="detail-value">{character.gender}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h2 className="section-title">Location Information</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Origin</span>
                <span className="detail-value">{character.origin.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Known Location</span>
                <span className="detail-value">{character.location.name}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="episodes-section">
          <h2 className="section-title">Episodes ({episodes.length})</h2>
          <div className="episodes-grid">
            {episodes.map((episode) => (
              <div key={episode.id} className="episode-card">
                <div className="episode-header">
                  <span className="episode-code">{episode.episode}</span>
                  <span className="episode-date">{episode.air_date}</span>
                </div>
                <h3 className="episode-title">{episode.name}</h3>
                <div className="episode-characters">
                  {episode.characters.length} characters
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="character-metadata">
          <p className="created-date">
            Created: {new Date(character.created).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </div>
  )
}
