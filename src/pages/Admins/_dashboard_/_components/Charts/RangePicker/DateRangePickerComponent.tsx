import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import React from 'react';

const { RangePicker } = DatePicker;

interface DateRangePickerComponentProps {
    onDateRangeChange: (dates: [Dayjs, Dayjs] | null) => void;
    value: [Dayjs, Dayjs];
}

const DateRangePickerComponent: React.FC<DateRangePickerComponentProps> = ({ onDateRangeChange, value }) => {
    return <RangePicker format='DD-MM-YYYY' onChange={onDateRangeChange as any} value={value} />;
};

export default DateRangePickerComponent;
