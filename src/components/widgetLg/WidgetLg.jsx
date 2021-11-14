import React from 'react'
import "./widgetLg.css"

const WidgetLg = () => {

    const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>;
    };

    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest Transactions</h3>
            <table className="widgetLgTable">
                <tbody>
                <tr className="widgetLgTr">
                    <th className="widgetLgTh">Customer</th>
                    <th className="widgetLgTh">Date</th>
                    <th className="widgetLgTh">Amount</th>
                    <th className="widgetLgTh">Status</th>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                        <img src="https://images.pexels.com/photos/9665516/pexels-photo-9665516.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" className="widgetLgImg" />
                        <span className="widgetLgName">Zeynep Salman</span>
                    </td>
                    <td className="widgetLgDate">28 Dec 2021</td>
                    <td className="widgetLgAmount">$122.00</td>
                    <td className="widgetLgStatus">
                        <Button type="Approved"/>
                    </td>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                        <img src="https://images.pexels.com/photos/9665516/pexels-photo-9665516.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" className="widgetLgImg" />
                        <span className="widgetLgName">Zeynep Salman</span>
                    </td>
                    <td className="widgetLgDate">28 Dec 2021</td>
                    <td className="widgetLgAmount">$122.00</td>
                    <td className="widgetLgStatus">
                        <Button type="Declined"/>
                    </td>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                        <img src="https://images.pexels.com/photos/9665516/pexels-photo-9665516.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" className="widgetLgImg" />
                        <span className="widgetLgName">Zeynep Salman</span>
                    </td>
                    <td className="widgetLgDate">28 Dec 2021</td>
                    <td className="widgetLgAmount">$122.00</td>
                    <td className="widgetLgStatus">
                        <Button type="Pending"/>
                    </td>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                        <img src="https://images.pexels.com/photos/9665516/pexels-photo-9665516.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" className="widgetLgImg" />
                        <span className="widgetLgName">Zeynep Salman</span>
                    </td>
                    <td className="widgetLgDate">28 Dec 2021</td>
                    <td className="widgetLgAmount">$122.00</td>
                    <td className="widgetLgStatus">
                        <Button type="Approved"/>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
    )
}

export default WidgetLg
