import { Space } from "antd";
import dayjs from "dayjs";

export default function PaymentInstallments({ paymentInstallments }){
    return(
        <>
            {
                paymentInstallments.map(( paymentInstallment, key ) =>
                    <Space className="mb-2" key = { key }>
                        <span style = {{ display: 'inline-block', padding: '5px 10px', borderRadius: '3px', background: 'lightGrey'}}> Date : &nbsp; { dayjs( paymentInstallment.paymentInstallmentDate ).format("DD/MM/YYYY") } </span>
                        <span style = {{ display: 'inline-block', padding: '5px 10px', borderRadius: '3px', background: 'lightGrey'}}> Montant : &nbsp; { paymentInstallment.paymentInstallMentAmount } &nbsp; Ar </span>
                    </Space>
                )
            }
        </>
    )
}