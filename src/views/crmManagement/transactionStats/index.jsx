import { getUserDiposit, getUserWithdrawal } from 'query/statistics/statistics.query'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { Loader } from 'shared/components/Loader'
import TransactionStatsCard from 'shared/components/TransactionStatsCard'


function TransactionStats () {
    const [userWithdrawalData, setUserWithdrawalData] = useState({})
    const [userDepositData, setUserDepositData] = useState({})
    const { isLoading, isFetching } = useQuery('userData', () => getUserWithdrawal(), {
        select: (data) => data.data.data,
        onSuccess: (response) => {

            const convertedObj = {};
            for (const key in response) {
                for (const item of response[key]) {
                    const id = item._id;
                    if (!convertedObj[id]) {
                        convertedObj[id] = {};
                    }
                    convertedObj[id][key] = item;
                }
            }
            setUserWithdrawalData(convertedObj)
        },
        onError: () => {
            setUserWithdrawalData({})
        }
    })

    const { isLoading: userDepositsisLoading, isFetching: userDepositsisFatching } = useQuery('userDeposits', () => getUserDiposit(), {
        select: (data) => data.data.data,
        onSuccess: (response) => {
            const convertedObj = {};
            for (const key in response) {
                response[key].forEach(item => {
                    const id = item._id;
                    if (!convertedObj[id]) {
                        convertedObj[id] = {};
                    }
                    convertedObj[id][key] = item;
                });
            }
            setUserDepositData(convertedObj)
        },
        onError: () => {
            setUserDepositData({})
        }
    })

    useEffect(() => {
        document.title = 'Transaction Stats'
    }, [])

    return (
        <>
            {isLoading || isFetching || userDepositsisLoading || userDepositsisFatching ? (
                <Loader />
            ) : (
                <>
                    <Row>
                        <Col xxl={4} lg={6} sm={12} md={12} className='pb-3 pb-lg-0 card-box mb-2'>
                            <TransactionStatsCard Title={"Approved Withdrawal"}
                                TotalMoney={userWithdrawalData?.success?.nOverall?.nTotalWithdrawal || 0.00}
                                TotalRequest={userWithdrawalData?.success?.nOverall?.nTotal || 0}

                                YearlyMoney={userWithdrawalData?.success?.nLastYear?.nTotalWithdrawal || 0.00}
                                QuaterlyMoney={userWithdrawalData?.success?.nLastThreeMonth?.nTotalWithdrawal || 0.00}
                                MonthlyMoney={userWithdrawalData?.success?.nLastMonth?.nTotalWithdrawal || 0.00}
                                TodayMoney={userWithdrawalData?.success?.nToday?.nTotalWithdrawal || 0.00}

                                YearlyRequest={userWithdrawalData?.success?.nLastYear?.nTotal || 0}
                                QuaterlyRequest={userWithdrawalData?.success?.nLastThreeMonth?.nTotal || 0}
                                MonthlyRequest={userWithdrawalData?.success?.nLastMonth?.nTotal || 0}
                                TodayRequest={userWithdrawalData?.success?.nToday?.nTotal || 0}

                                transactionCardNumber={'transaction-card-color-1'}

                            />
                        </Col>
                        <Col xxl={4} lg={6} sm={12} md={12} className='pb-3 pb-lg-0 card-box mb-2'>
                            <TransactionStatsCard Title={"Pending Withdrawal"}
                                TotalMoney={userWithdrawalData?.pending?.nOverall?.nTotalWithdrawal || 0.00}
                                TotalRequest={userWithdrawalData?.pending?.nOverall?.nTotal || 0}

                                YearlyMoney={userWithdrawalData?.pending?.nLastYear?.nTotalWithdrawal || 0.00}
                                QuaterlyMoney={userWithdrawalData?.pending?.nLastThreeMonth?.nTotalWithdrawal || 0.00}
                                MonthlyMoney={userWithdrawalData?.pending?.nLastMonth?.nTotalWithdrawal || 0.00}
                                TodayMoney={userWithdrawalData?.pending?.nToday?.nTotalWithdrawal || 0.00}

                                YearlyRequest={userWithdrawalData?.pending?.nLastYear?.nTotal || 0}
                                QuaterlyRequest={userWithdrawalData?.pending?.nLastThreeMonth?.nTotal || 0}
                                MonthlyRequest={userWithdrawalData?.pending?.nLastMonth?.nTotal || 0}
                                TodayRequest={userWithdrawalData?.pending?.nToday?.nTotal || 0}

                                transactionCardNumber={'transaction-card-color-2'}
                            />
                        </Col>
                        <Col xxl={4} lg={6} sm={12} md={12} className='pb-3 pb-lg-0 card-box mb-2'>
                            <TransactionStatsCard Title={"Rejected Withdrawal"}
                                TotalMoney={userWithdrawalData?.rejected?.nOverall?.nTotalWithdrawal || 0.00}
                                TotalRequest={userWithdrawalData?.rejected?.nOverall?.nTotal || 0}

                                YearlyMoney={userWithdrawalData?.rejected?.nLastYear?.nTotalWithdrawal || 0.00}
                                QuaterlyMoney={userWithdrawalData?.rejected?.nLastThreeMonth?.nTotalWithdrawal || 0.00}
                                MonthlyMoney={userWithdrawalData?.rejected?.nLastMonth?.nTotalWithdrawal || 0.00}
                                TodayMoney={userWithdrawalData?.rejected?.nToday?.nTotalWithdrawal || 0.00}

                                YearlyRequest={userWithdrawalData?.rejected?.nLastYear?.nTotal || 0}
                                QuaterlyRequest={userWithdrawalData?.rejected?.nLastThreeMonth?.nTotal || 0}
                                MonthlyRequest={userWithdrawalData?.rejected?.nLastMonth?.nTotal || 0}
                                TodayRequest={userWithdrawalData?.rejected?.nToday?.nTotal || 0}

                                transactionCardNumber={'transaction-card-color-3'}
                            />
                        </Col>
                        <Col xxl={4} lg={6} sm={12} md={12} className='pb-3 pb-lg-0 card-box mb-2'>
                            <TransactionStatsCard Title={"Approved Deposit"}
                                TotalMoney={userDepositData?.success?.nOverall?.nTotalDeposit || 0.00}
                                TotalRequest={userDepositData?.success?.nOverall?.nTotal || 0}

                                YearlyMoney={userDepositData?.success?.nLastYear?.nTotalDeposit || 0.00}
                                QuaterlyMoney={userDepositData?.success?.nLastThreeMonth?.nTotalDeposit || 0.00}
                                MonthlyMoney={userDepositData?.success?.nLastMonth?.nTotalDeposit || 0.00}
                                TodayMoney={userDepositData?.success?.nToday?.nTotalDeposit || 0.00}

                                YearlyRequest={userDepositData?.success?.nLastYear?.nTotal || 0}
                                QuaterlyRequest={userDepositData?.success?.nLastThreeMonth?.nTotal || 0}
                                MonthlyRequest={userDepositData?.success?.nLastMonth?.nTotal || 0}
                                TodayRequest={userDepositData?.success?.nToday?.nTotal || 0}

                                transactionCardNumber={'transaction-card-color-4'}
                            />
                        </Col>
                        <Col xxl={4} lg={6} sm={12} md={12} className='pb-3 pb-lg-0 card-box mb-2'>
                            <TransactionStatsCard Title={"Pending Deposit"}
                                TotalMoney={userDepositData?.pending?.nOverall?.nTotalDeposit || 0.00}
                                TotalRequest={userDepositData?.pending?.nOverall?.nTotal || 0}

                                YearlyMoney={userDepositData?.pending?.nLastYear?.nTotalDeposit || 0.00}
                                QuaterlyMoney={userDepositData?.pending?.nLastThreeMonth?.nTotalDeposit || 0.00}
                                MonthlyMoney={userDepositData?.pending?.nLastMonth?.nTotalDeposit || 0.00}
                                TodayMoney={userDepositData?.pending?.nToday?.nTotalDeposit || 0.00}

                                YearlyRequest={userDepositData?.pending?.nLastYear?.nTotal || 0}
                                QuaterlyRequest={userDepositData?.pending?.nLastThreeMonth?.nTotal || 0}
                                MonthlyRequest={userDepositData?.pending?.nLastMonth?.nTotal || 0}
                                TodayRequest={userDepositData?.pending?.nToday?.nTotal || 0}

                                transactionCardNumber={'transaction-card-color-5'}
                            />
                        </Col>
                        <Col xxl={4} lg={6} sm={12} md={12} className='pb-3 pb-lg-0 card-box mb-2'>
                            <TransactionStatsCard Title={"Rejected Deposit"}
                                TotalMoney={userDepositData?.failed?.nOverall?.nTotalDeposit || 0.00}
                                TotalRequest={userDepositData?.failed?.nOverall?.nTotal || 0}

                                YearlyMoney={userDepositData?.failed?.nLastYear?.nTotalDeposit || 0.00}
                                QuaterlyMoney={userDepositData?.failed?.nLastThreeMonth?.nTotalDeposit || 0.00}
                                MonthlyMoney={userDepositData?.failed?.nLastMonth?.nTotalDeposit || 0.00}
                                TodayMoney={userDepositData?.failed?.nToday?.nTotalDeposit || 0.00}

                                YearlyRequest={userDepositData?.failed?.nLastYear?.nTotal || 0}
                                QuaterlyRequest={userDepositData?.failed?.nLastThreeMonth?.nTotal || 0}
                                MonthlyRequest={userDepositData?.failed?.nLastMonth?.nTotal || 0}
                                TodayRequest={userDepositData?.failed?.nToday?.nTotal || 0}

                                transactionCardNumber={'transaction-card-color-6'}
                            />
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default TransactionStats