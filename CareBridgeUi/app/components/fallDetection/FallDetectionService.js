// FallDetectionService.js
import { Vibration } from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';

const accThreshold = 5;
const gyroThreshold = 5;

const isFall = (accelerationData, gyroscopeData) => {
  // Calculate the magnitude of acceleration.
  const accMagnitude = Math.sqrt(
	(accelerationData.x ** 2) + (accelerationData.y ** 2) + (accelerationData.z ** 2)
  );

  const gyroMagnitude = Math.sqrt(
	(gyroscopeData.x ** 2) + (gyroscopeData.y ** 2) + (gyroscopeData.z ** 2)
  );

  let minAcc = 1;
  let maxAcc = 0;
  let minGyro = 1;
  let maxGyro = 0;

  if (accMagnitude > maxAcc) {
	maxAcc = accMagnitude
  }
  if (accMagnitude < minAcc) {
	minAcc = accMagnitude
  }

  if (gyroMagnitude > maxGyro) {
	maxGyro = gyroMagnitude
  }
  if (gyroMagnitude < minGyro) {
	minGyro = gyroMagnitude
  }

  const accDiff = maxAcc - minAcc;
  const gyroDiff = maxGyro - minGyro;

  const anglex = (Math.acos(accelerationData.x) * 180) / 9.8;
  const angley = (Math.acos(accelerationData.y) * 180) / 9.8;
  const anglez = (Math.acos(accelerationData.z) * 180) / 9.8;

  const degreesX = (anglex * 180) / Math.PI;
  const degreesY = (angley * 180) / Math.PI;
  const degreesZ = (anglez * 180) / Math.PI;

  // Check if the magnitude exceeds the threshold.
  return accDiff > accThreshold && gyroDiff > gyroThreshold;
};

const handleFallDetected = async () => {
  Vibration.vibrate();
};

export const startFallDetection = () => {
  let accelSubscription;
  let gyroSubscription;

  accelSubscription = Accelerometer.addListener((accelerationData) => {
    Gyroscope.addListener((gyroscopeData) => {
      if (isFall(accelerationData, gyroscopeData)) {
        handleFallDetected();
      }
    });
  });

  return () => {
    accelSubscription && accelSubscription.remove();
    gyroSubscription && gyroSubscription.remove();
  };
};
