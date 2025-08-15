jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => {
    throw new Error('notFound called');
  }),
}));

jest.mock('date-fns', () => ({
  format: () => 'December 2, 2013'
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('Character Detail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles 404 errors', async () => {
    mockFetch.mockResolvedValue({ 
      ok: false,
      status: 404
    });

    const CharacterDetailPage = (await import('../page')).default;
    
    await expect(
      CharacterDetailPage({ params: { id: '999' } })
    ).rejects.toThrow('notFound called');
  });

  it('renders character page', async () => {
    const mockCharacter = {
      id: 1,
      name: 'Rick',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth' },
      location: { name: 'Earth' },
      image: 'test.jpg',
      episode: ['ep1', 'ep2']
    };

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCharacter)
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([
          { id: 1, name: 'Pilot', air_date: '2013-12-02', episode: 'S01E01' }
        ])
      });

    const CharacterDetailPage = (await import('../page')).default;
    const result = await CharacterDetailPage({ params: { id: '1' } });
    
    expect(result).toBeDefined();
  });
});
