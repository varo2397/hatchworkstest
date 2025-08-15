import { Character, ApiResponse } from '@/types/rickandmorty';
import DataTable, { ColumnType } from '@/components/DataTable';
import './characters.css';

async function getCharacters(): Promise<ApiResponse<Character>> {
  const res = await fetch('https://rickandmortyapi.com/api/character', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch characters');
  }

  return res.json();
}

export default async function CharactersPage() {
  const data = await getCharacters();

  const columns: ColumnType<Character>[] = [
    {
      key: 'image',
      header: 'Image',
      type: 'image',
      width: '5%'
    },
    {
      key: 'name',
      header: 'Name',
      type: 'link',
      width: '25%'
    },
    {
      key: 'status',
      header: 'Status',
      type: 'status',
      width: '15%'
    },
    {
      key: 'species',
      header: 'Species',
      width: '20%'
    },
    {
      key: 'gender',
      header: 'Gender',
      width: '15%'
    }
  ];

  const getCharacterLink = (character: Character) => `/characters/${character.id}`;
  
  const getStatusClass = (character: Character) => `status-${character.status.toLowerCase()}`;

  return (
    <div className="characters-container">
      <div className="characters-header">
        <h1>Characters</h1>
      </div>

      <DataTable
        data={data.results}
        columns={columns}
        keyField="id"
        getLinkUrl={getCharacterLink}
        getStatusClass={getStatusClass}
        imageWidth={60}
        imageHeight={60}
      />
    </div>
  );
}
