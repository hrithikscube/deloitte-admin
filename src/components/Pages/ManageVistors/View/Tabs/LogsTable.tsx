import { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import moment from 'moment'
import { makeStyles } from '@mui/styles'
import NotFound from '../../../../../assets/images/NotFound.svg'

import { useDispatch } from 'react-redux'
import { checkModulePrivilegeAccess, uuid } from '../../../../../utils/helpers'
import { Avatar, Tooltip } from '@mui/material'
import Popup from '../../../../Common/Popup'
import CircularProgress from '@mui/material/CircularProgress'
import axiosInstance from '../../../../../utils/axios'
import { showToastMessage } from '../../../../../utils/helpers'

const useStyles = makeStyles(() => ({
  root: {
    '& td ': {
      color: '#141C4C',
    },
    '& th ': {
      color: 'rgba(20, 28, 76, 0.7)',
    },
  },

  tr: {
    '& td:first-child ': {
      borderTopLeftRadius: '8px',
      borderBottomLeftRadius: '8px',
    },
    '& td:last-child ': {
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
    },
  },
}))
const LogsTable = ({ dataList, isLoading }: any) => {
  const classes = useStyles()
  const headings = [
    'Image',
    'Entry Type',
    'Time',
  ]

  return (
    <>
      <TableContainer component={Paper} elevation={0}>
        {isLoading ? (
          <div className='w-full h-80 flex justify-center items-center'>
            <CircularProgress />
            <span className='text-3xl'>Loading...</span>
          </div>
        ) : dataList.length > 0 ? (
          <Table
            aria-label='simple table'
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: '1px solid #E7E8ED',
              },
              minWidth: 650,
              //   border: '1px solid #E7E8ED',
              borderCollapse: 'separate',
              borderSpacing: '0px 5px',
              px: '24px',
              background: '#F1F4F8',
              borderRadius: '8px',
              '& .css-zvlqj6-MuiTableCell-root': {
                padding: 0,
              },
              padding: 0,
            }}
            className={classes.root}
          >
            <TableHead>
              <TableRow>
                {headings.map((title: any) => {
                  return (
                    <TableCell align='center' sx={{ color: '#5B6082', fontSize: '0.8rem' }}>
                      <span>{title}</span>
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList?.map((item: any, index: number) => (
                <TableRow
                  sx={{
                    height: "16px",
                    backgroundColor: "#F1F4F8",
                    color: "#141C4C",
                  }}
                  className={classes.tr}
                >
                  <TableCell
                    align="center"
                    sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                  >
                    <div className='flex flex-col justify-center items-center'>
                      <img className='w-[50px] h-[50px] object-cover' src={'data:image/png;base64,' + item.image} alt={'avatar'} />
                    </div>
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                  >
                    {item?.entry_type ?? '-'}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                  >
                    {moment(item.created_at).format('YYYY-MM-DD HH:mm:ss A  ')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className='flex justify-center items-center flex-col gap-4 mt-6'>
            <img src={NotFound} alt='' width="100px" />
            <p className='text-[18px] font-nunitoBold'>No Results found !!</p>
          </div>
        )}
      </TableContainer>
    </>
  )
}
export default LogsTable