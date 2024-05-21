import CollabManagement from 'src/pages/Admin/Collab/CollabManagement';
import { render, screen, waitFor } from '@testing-library/react';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
// import { rest } from 'msw';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

const server = setupServer(
  http.get('/collabs', () => {
    return HttpResponse.json([
      [
        'https://res.cloudinary.com/dpurshaxm/image/upload/v1713795831/bk_artisan/lauhoi2010.webp',
        'Lầu Hội',
        'M',
        '01234567',
        'Doomreaper0@gmail.com',
        'lauhoi2010',
      ],
    ]);
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('Cart', () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <CollabManagement />
      </QueryClientProvider>
    );
  });

  it('Render sản phẩm trong cart', async () => {
    await waitFor(() => expect(screen.getByText(/Nam/)).toBeInTheDocument(), {
      timeout: 10000,
    });
  });
  it('Render số lượng sản phẩm', async () => {
    await waitFor(() => expect(screen.getByText(/Nam/)).toBeInTheDocument(), {
      timeout: 10000,
    });
  });
  it('Render phương thức thanh toán', async () => {
    await waitFor(() => expect(screen.getByText(/Nam/)).toBeInTheDocument(), {
      timeout: 10000,
    });
  });
  it('Render ô input nhập mã giảm giá', async () => {
    await waitFor(() => expect(screen.getByText(/Nam/)).toBeInTheDocument(), {
      timeout: 10000,
    });
  });
  it('Render thông tin về đơn hàng', async () => {
    await waitFor(() => expect(screen.getByText(/Nam/)).toBeInTheDocument(), {
      timeout: 10000,
    });
  });
  it('Xóa sản phẩm thành công', async () => {
    await waitFor(() => expect(screen.getByText(/Nam/)).toBeInTheDocument(), {
      timeout: 10000,
    });
  });
  it('Thay đổi số lượng sản phẩm', async () => {
    await waitFor(() => expect(screen.getByText(/Nam/)).toBeInTheDocument(), {
      timeout: 10000,
    });
  });
});
