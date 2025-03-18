// CountdownTimer.tsx
import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [time, setTime] = useState<number>(30 * 60); // Khởi tạo thời gian là 30 phút (tính bằng giây)

  // Cập nhật thời gian đếm ngược mỗi giây
  const updateCountdown = () => {
    if (time > 0) {
      setTime(time - 1); // Giảm thời gian mỗi giây
    }
  };

  // Sử dụng useEffect để gọi updateCountdown mỗi giây
  useEffect(() => {
    const interval = setInterval(updateCountdown, 1000);

    // Cleanup interval khi component unmount
    return () => clearInterval(interval);
  }, [time]); // Chạy lại khi `time` thay đổi

  // Hàm format thời gian (tính phút:giây)
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="timer" style={{ textAlign: 'center', fontSize: '2em', marginTop: '20px' }}>
      <p><span>{formatTime(time)}</span></p>
      {time === 0 && <p>Hết giờ!</p>}
    </div>
  );
};

export default CountdownTimer;
