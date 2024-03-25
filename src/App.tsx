
import { ChangeEvent, useEffect, useState, MouseEvent, useMemo } from 'react';
import './App.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PokemonModal } from './PokemonModal';
import { Data, Pokemon } from './Pokemon.interface';
import { EnhancedTableHead, Order, TablePaginationActions, getComparator, stableSort } from './TableComponent';

function App() {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('name');
  const [data, setData] = useState([]);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const emptyRows =page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  useEffect(() => {
    const fetchData = () => {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then((allpokemon) => {
          setData(allpokemon.results);
          setRowsPerPage(5)
          
        })
    }
    fetchData();
  }, []);
  
  const handleClick = async (url: string) => {
    setLoading(true);
    const result = await fetch(url)
    result.json().then(data => {
      handleOpen();
      setTimeout(() => {
        setPokemon(data)
        setLoading(false);
      }, 1000);
    })
      
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const visibleRows = useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, data],
  );
  
   return (
    <div className='pokemon'>
        <img className='pokemon-image' src="https://cdn2.iconfinder.com/data/icons/poke-ball-set-free/150/Team_Rocket_Ball-512.png" alt="ball" />
        <div className='pokemon-table-wrapper'>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                  {visibleRows.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        onClick={() => handleClick(row.url)}
                        tabIndex={-1}
                        key={row.name}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                        >
                          {row.name}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    colSpan={3}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                      select: {
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <PokemonModal 
            open={open}
            handleClose={handleClose}
            pokemon={pokemon}
            loading={loading}
          />
        </div>
    </div>
  );
}

export default App;
