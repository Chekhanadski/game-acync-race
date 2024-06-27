const URL = 'http://127.0.0.1:3000';

export const getCars = async (_page?: number, _limit?: number | null) => {
  const queryParams = `${_page ? `?_page=${_page}` : ''}${_limit === null ? '' : `&_limit=7`}`;
  const response = await fetch(`${URL}/garage${queryParams}`, {
    method: 'GET',
  });
  const data = await response.json();

  return data;
};

export const getWinners = async (
  _page?: number,
  _limit?: number | null,
  _sort?: 'id' | 'wins' | 'time',
  _order?: 'ASC' | 'DESC',
) => {
  const queryParams = `${_page ? `?_page=${_page}` : ''}${_limit === null ? '' : `&_limit=10`}${_sort ? `?_sort=${_sort}` : ''}${_order ? `?_order=${_order}` : ''}`;
  const response = await fetch(`${URL}/winners${queryParams}`, {
    method: 'GET',
  });
  const data = await response.json();

  return data;
};

export const getCar = async (id: number) => {
  const response = await fetch(`${URL}/garage/${id}`, {
    method: 'GET',
  });
  const data = await response.json();

  return data;
};

export const createCar = async (name: string, color: string) => {
  const body = { name, color };
  const response = await fetch(`${URL}/garage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  await response.json();
};

export const deleteCar = async (id: number) => {
  const response = await fetch(`${URL}/garage/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();

  return data;
};

export const updateCar = async (id: number, name: string, color: string) => {
  const body = { name, color };
  const response = await fetch(`${URL}/garage/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();

  return data;
};

export const startStopCar = async (
  id: number,
  status: 'started' | 'stopped',
) => {
  const queryParams = `?id=${id}&status=${status}`;
  const response = await fetch(`${URL}/engine${queryParams}`, {
    method: 'PATCH',
  });
  const data = await response.json();

  return data;
};

export const driveCar = async (id: number, status: 'drive') => {
  const queryParams = `?id=${id}&status=${status}`;
  const response = await fetch(`${URL}/engine${queryParams}`, {
    method: 'PATCH',
  });
  const responseStatus = response.status === 500 ? response.status : null;

  return responseStatus;
};

export const getWinner = async (id: number) => {
  const response = await fetch(`${URL}/winners/${id}`, {
    method: 'GET',
  });

  const data = await response.json();

  return data;
};

export const createWinner = async (id: number, wins: number, time: number) => {
  const body = { id, wins, time };
  const response = await fetch(`${URL}/winners`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  await response.json();
};

export const deleteWinner = async (id: number) => {
  const response = await fetch(`${URL}/winners/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();

  return data;
};

export const updateWinner = async (id: number, wins: number, time: number) => {
  const body = { wins, time };
  const response = await fetch(`${URL}/winners/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();

  return data;
};
