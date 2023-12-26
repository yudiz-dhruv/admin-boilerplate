import { getBotRevenue, getTds, getUserData, getUserTransaction } from 'query/statistics/statistics.query';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Loader } from 'shared/components/Loader';
import Table from 'react-bootstrap/Table';
import StatisticsCard from 'shared/components/statisticsCard';
import { Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faRobot, faIndianRupeeSign, faGamepad, faRightLeft, faMoneyBill1Wave, faWallet } from '@fortawesome/free-solid-svg-icons'


function Statistics () {

    const [userData, setUserData] = useState({})
    const [userTransaction, setUserTransaction] = useState({})
    const [botRevenue, setBotRevenue] = useState([])
    const [tds, setTds] = useState([])

    const { isLoading, isFetching } = useQuery('userData', () => getUserData(), {
        select: (data) => data.data.data,
        onSuccess: (response) => {
            setUserData(response)
        },
        onError: () => {
            setUserData({})
        }
    })
    const { isLoading: userTransactionisLoading, isFetching: userTransactionisFetching } = useQuery('userTransaction', () => getUserTransaction(), {
        select: (data) => data.data.data,
        onSuccess: (response) => {
            setUserTransaction(response)
        },
        onError: () => {
            setUserTransaction({})
        }
    })
    const { isLoading: botRevenueisLoading, isFetching: botRevenueisFetching } = useQuery('botRevenue', () => getBotRevenue(), {
        select: (data) => data.data.data,
        onSuccess: (response) => {
            setBotRevenue(response)
        },
        onError: () => {
            setBotRevenue({})
        }
    })
    const { isLoading: tdsisLoading, isFetching: tdsisFetching } = useQuery('tds', () => getTds(), {
        select: (data) => data.data.data,
        onSuccess: (response) => {
            setTds(response)
        },
        onError: () => {
            setTds({})
        }
    })

    const totalGameprofit = userTransaction.nTotalIn - userTransaction.nTotalOut
    const totalProfit = userTransaction.nTotalIn - userTransaction.nTotalOut + botRevenue[0]?.nRevenueByBot

    useEffect(() => {
        document.title = 'Statistics'
    }, [])
    return (
        <>
            {tdsisLoading || tdsisFetching || isLoading || isFetching || userTransactionisLoading || userTransactionisFetching || botRevenueisLoading || botRevenueisFetching ? (
                <Loader />
            ) : (
                <>
                    <Row>
                        <StatisticsCard
                            icon={<FontAwesomeIcon icon={faUsers} className="statistics-user-icon" />}
                            cardTitle='Users'
                            totalNumber={70}
                            Table={<>
                                <Table className='statistics-card-table-data'>
                                    <tbody>
                                        <tr>
                                            Balance : <span>{userData?.nTotalUserBalance?.toExponential(2) || '0'}</span>
                                        </tr>
                                        <tr>Pending Withdrawal : <span>{userData?.nUserPending || '0'}</span>
                                        </tr>
                                        <tr>
                                            <td>Registered Users</td> <td>{userData?.nTotalActiveUsers || '0'}</td>
                                        </tr>
                                        <tr>
                                            <td>Deleted Users</td> <td>{userData?.nTotalDeletedUsers || '0'}</td>
                                        </tr>
                                        <tr>
                                            <td>Mobile Verified</td> <td>{userData?.nTotalMobileVerifiedUsers || '0'}</td>
                                        </tr>
                                        <tr>
                                            <td>Email Verified</td> <td>{userData?.nTotalEmailVerifiedUsers || '0'}</td>
                                        </tr>
                                        <tr>
                                            <td>KYC Verified</td> <td>{userData?.nKycVerified || '0'}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </>}
                        />

                        <StatisticsCard
                            icon={<FontAwesomeIcon icon={faRobot} className="statistics-bot-icon" />}
                            cardTitle='Bot'
                            totalNumber={userData?.nTotalBot || '0'}
                            Table={<>
                                <Table className='statistics-card-table-data'>
                                    <tbody>
                                        <tr>
                                            Balance : <span>{userData?.nTotalBotBalance?.toExponential(2) || '0'}</span>
                                        </tr>
                                        <tr>
                                            <td>Free Bot</td> <td>{userData?.nTotalBot || '0'}</td>
                                        </tr>
                                        <tr>
                                            <td>Busy Bot</td> <td>{userData?.nTotalBot || '0'}</td>
                                        </tr>
                                        <tr>
                                            <td>Active Bot</td> <td>{userData?.nTotalBot || '0'}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </>}
                        />

                        <StatisticsCard
                            icon={<FontAwesomeIcon icon={faIndianRupeeSign} className="statistics-balance-icon" />}
                            cardTitle='Balance'
                            Table={<>
                                <Table className='statistics-card-table-data'>
                                    <tbody>
                                        <tr>
                                            <td>Total Deposit</td> <td>{userData?.nTotalDeposit || '0'}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Withdrawal</td> <td>{userData?.nTotalWithdrawal || '0'}</td>
                                        </tr>
                                        <tr>
                                            <td>Admin Credit</td> <td>{userData?.nAdminCredit || '0'}</td>
                                        </tr>
                                        <tr>
                                            <td>Admin Debit</td> <td>{userData?.nAdminDebit || '0'}</td>
                                        </tr>
                                        <tr>
                                            <td>User Credit</td> <td>{userData?.nUserCredit || '0'}</td>
                                        </tr>
                                        <tr>
                                            <td>User Debit</td> <td>{userData?.nUserDebit || '0'}</td>
                                        </tr>
                                        <tr>
                                            <td>Bot Credit</td> <td>{userData?.nAdminBotCredit || '0'}</td>
                                        </tr>
                                        <tr>
                                            <td>Bot Debit</td> <td>{userData?.nAdminBotDebit || '0'}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </>}
                        />

                        <StatisticsCard
                            icon={<FontAwesomeIcon icon={faGamepad} className="statistics-game-table-icon" />}
                            cardTitle='Game Tables'
                            Table={<>
                                <Table className='statistics-data-table'>
                                    <thead>
                                        <tr>
                                            <th>&nbsp;</th>
                                            <th>Finished</th>
                                            <th>Running</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Deal</td>
                                            <td>{userData.nTotalFinishedDealGames || 0}</td>
                                            <td>{userData.nTotalRunningDealGames || 0}</td>
                                        </tr>
                                        <tr>
                                            <td>Pool</td>
                                            <td>{userData.nTotalFinishedPoolGames || 0}</td>
                                            <td>{userData.nTotalRunningPoolGames || 0}</td>
                                        </tr>
                                        <tr>
                                            <td>13-Point</td>
                                            <td>{userData.nTotalFinishedPointGames || 0}</td>
                                            <td>{userData.nTotalRunningPointGames || 0}</td>
                                        </tr>
                                        <tr >
                                            <th>All</th>
                                            <th>{userData.nTotalFinishedGames || 0}</th>
                                            <th>{userData.nTotalRunningGames || 0}</th>
                                        </tr>
                                    </tbody>
                                </Table>
                            </>}
                        />

                        <StatisticsCard
                            icon={<FontAwesomeIcon icon={faRightLeft} className="statistics-transaction-icon" />}
                            cardTitle='Game Transaction'
                            Table={<>
                                <Table className='statistics-data-table'>
                                    <thead>
                                        <tr>
                                            <th>&nbsp;</th>
                                            <th>In</th>
                                            <th>Out</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Deal</td>
                                            <td>{userTransaction?.nDealIn?.toFixed(2) || '0'}</td>
                                            <td>{userTransaction?.nDealOut?.toFixed(2) || '0'}</td>
                                        </tr>
                                        <tr>
                                            <td>13-Point</td>
                                            <td>{userTransaction?.nPointIn?.toFixed(2) || '0'}</td>
                                            <td>{userTransaction?.nPointOut?.toFixed(2) || '0'}</td>
                                        </tr>

                                        <tr>
                                            <td>Pool</td>
                                            <td>{userTransaction?.nPoolIn?.toFixed(2) || '0'}</td>
                                            <td>{userTransaction?.nPoolOut?.toFixed(2) || '0'}</td>
                                        </tr>
                                        <tr>
                                            <th>All</th>
                                            <th>{userTransaction?.nTotalIn?.toFixed(2) || '0'}</th>
                                            <th>{userTransaction?.nTotalOut?.toFixed(2) || '0'}</th>
                                        </tr>
                                    </tbody>
                                </Table>
                            </>}
                        />


                        <StatisticsCard
                            icon={<FontAwesomeIcon icon={faMoneyBill1Wave} className="statistics-profit-icon" />}
                            cardTitle='Profit'
                            Table={<>
                                <Table className='statistics-card-table-data'>
                                    <tbody>
                                        <tr>
                                            <td>Game profit</td> <td>{totalGameprofit.toFixed(2) || '0'}</td>
                                        </tr>
                                        <tr>
                                            <td>Bot profit</td> <td>{botRevenue[0]?.nRevenueByBot?.toFixed(2) || '0'}</td>
                                        </tr>
                                        <tr>
                                            <th>Total profit </th> <th>{totalProfit.toFixed(2) || '0'}</th>
                                        </tr>

                                    </tbody>
                                </Table>
                            </>}
                        />

                        <StatisticsCard
                            icon={<FontAwesomeIcon icon={faWallet} className="statistics-tds-icon" />}
                            cardTitle='TDS'
                            Table={<>
                                <Table className='statistics-card-table-data'>
                                    <tbody>
                                        <tr>
                                            <td>Total TDS</td> <td>{tds[0]?.nTotalTDS?.toFixed(2) || '0'}</td>
                                        </tr>
                                        <tr>
                                            <td>Pending TDS</td> <td>{tds[0]?.nPendingTDS?.toFixed(2) || '0'}</td>
                                        </tr>
                                        <tr>
                                            <td>Claimed TDS</td> <td>{tds[0]?.nClaimedTDS?.toFixed(2) || '0'}</td>
                                        </tr>

                                    </tbody>
                                </Table>
                            </>}
                        />
                    </Row>
                </>
            )}
        </>
    )
}

export default Statistics