import React from "react";
import { Card, Table } from "antd";

const dataSource = [
  {
    key: "1",
    subject: "Mike",
    type: "-",
    address: "0x12...2345",
    message: "Cookies 🍪",
    amount: "$3.50",
  },
  {
    key: "2",
    subject: "Amanda",
    type: "+",
    address: "0x12...2345",
    message: "Dinner 🍔",
    amount: "$22.30",
  },
  {
    key: "3",
    subject: "Roy",
    type: "-",
    address: "0x12...2345",
    message: "Movie Tickets",
    amount: "$17.31",
  },
  {
    key: "4",
    subject: "Amanda",
    type: "-",
    address: "0x12...2345",
    message: "Lunch",
    amount: "$9.20",
  },
  {
    key: "5",
    subject: "Charlie",
    type: "-",
    address: "0x12...2345",
    message: "Golf ⛳️",
    amount: "$49.99",
  },
  {
    key: "6",
    subject: "Charlie",
    type: "+",
    address: "0x12...2345",
    message: "Gatorade",
    amount: "$2.30",
  },
  {
    key: "7",
    subject: "Mike",
    type: "-",
    address: "0x12...2345",
    message: "Poker ♠️",
    amount: "$3.50",
  },
  {
    key: "8",
    subject: "Jimmy",
    type: "-",
    address: "0x12...2345",
    message: "Car Fix",
    amount: "$30.00",
  },
];

const columns = [
  {
    title: "Payment Subjet",
    dataIndex: "subject",
    key: "subject",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },

  {
    title: "Message",
    dataIndex: "message",
    key: "message",
  },
  {
    title: "Amount",
    key: "amount",
    render: (
      _: any,
      record: {
        type: string;
        amount: string;
      }
    ) => (
      <div style={record.type === "-" ? { color: "red" } : { color: "green" }}>
        {record.type}
        {record.amount} Matic
      </div>
    ),
  },
];

export interface History {
  key: string;
  subject: string;
  type: string;
  address: string;
  message: string;
  amount: string;
}

export interface RecentActivityProps {
  history: History[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ history }) => {
  return (
    <Card title="Recent Activity" style={{ width: "100%", minHeight: "663px" }}>
      {history && (
        <Table
          dataSource={history}
          columns={columns}
          pagination={{ position: ["bottomCenter"], pageSize: 8 }}
        />
      )}
    </Card>
  );
};

export default RecentActivity;
