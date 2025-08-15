import { notFound } from 'next/navigation';
import { getCharacters } from '../page';

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('Characters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls notFound on API error', async () => {
    mockFetch.mockResolvedValue({ 
      ok: false,
      json: jest.fn()
    });

    await getCharacters();
    
    expect(notFound).toHaveBeenCalled();
  });

  it('fetches data successfully', async () => {
    const mockData = { results: [] };
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    });

    const result = await getCharacters();
    
    expect(result).toEqual(mockData);
  });
});
