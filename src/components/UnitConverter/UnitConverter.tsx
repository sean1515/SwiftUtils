import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

type UnitCategory = 'length' | 'weight' | 'temperature' | 'volume';

interface UnitConversion {
  from: string;
  to: string;
  value: string;
  result: string;
}

const unitTypes: Record<UnitCategory, string[]> = {
  length: ['meters', 'kilometers', 'miles', 'feet', 'inches', 'centimeters'],
  weight: ['kilograms', 'grams', 'pounds', 'ounces'],
  temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
  volume: ['liters', 'milliliters', 'gallons', 'cubic meters', 'cubic feet'],
};

const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [conversion, setConversion] = useState<UnitConversion>({
    from: '',
    to: '',
    value: '',
    result: '',
  });

  const convert = (value: string, from: string, to: string): string => {
    if (!value || !from || !to) return '';
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 'Invalid input';

    // Convert to base unit first, then to target unit
    let baseValue: number;
    let result: number;

    switch (category) {
      case 'length':
        // Convert to meters first
        baseValue = convertToMeters(numValue, from);
        result = convertFromMeters(baseValue, to);
        break;

      case 'weight':
        // Convert to kilograms first
        baseValue = convertToKilograms(numValue, from);
        result = convertFromKilograms(baseValue, to);
        break;

      case 'temperature':
        // Direct conversion for temperature
        result = convertTemperature(numValue, from, to);
        break;

      case 'volume':
        // Convert to liters first
        baseValue = convertToLiters(numValue, from);
        result = convertFromLiters(baseValue, to);
        break;

      default:
        return 'Invalid category';
    }

    return result.toFixed(4);
  };

  useEffect(() => {
    if (conversion.from && conversion.to && conversion.value) {
      const result = convert(conversion.value, conversion.from, conversion.to);
      setConversion((prev) => ({ ...prev, result }));
    }
  }, [conversion.from, conversion.to, conversion.value, category]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Unit Converter
      </Typography>

      <Stack spacing={3} sx={{ maxWidth: 600, mx: 'auto' }}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => {
                  setCategory(e.target.value as UnitCategory);
                  setConversion({ from: '', to: '', value: '', result: '' });
                }}
              >
                <MenuItem value="length">Length</MenuItem>
                <MenuItem value="weight">Weight</MenuItem>
                <MenuItem value="temperature">Temperature</MenuItem>
                <MenuItem value="volume">Volume</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>From</InputLabel>
              <Select
                value={conversion.from}
                label="From"
                onChange={(e) =>
                  setConversion((prev) => ({ ...prev, from: e.target.value as string }))
                }
              >
                {unitTypes[category]
                  .filter((unit) => unit !== conversion.to)
                  .map((unit) => (
                    <MenuItem key={unit} value={unit}>
                      {unit}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>To</InputLabel>
              <Select
                value={conversion.to}
                label="To"
                onChange={(e) =>
                  setConversion((prev) => ({ ...prev, to: e.target.value as string }))
                }
              >
                {unitTypes[category]
                  .filter((unit) => unit !== conversion.from)
                  .map((unit) => (
                    <MenuItem key={unit} value={unit}>
                      {unit}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <TextField
              label="Value"
              type="number"
              value={conversion.value}
              onChange={(e) => setConversion((prev) => ({ ...prev, value: e.target.value }))}
              fullWidth
            />

            {conversion.result && (
              <Paper elevation={1} sx={{ p: 2, bgcolor: 'background.default' }}>
                <Typography variant="h6" gutterBottom>
                  Result
                </Typography>
                <Typography>
                  {conversion.value} {conversion.from} = {conversion.result} {conversion.to}
                </Typography>
              </Paper>
            )}
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

// Conversion helper functions
const convertToMeters = (value: number, unit: string): number => {
  switch (unit) {
    case 'meters':
      return value;
    case 'kilometers':
      return value * 1000;
    case 'miles':
      return value * 1609.344;
    case 'feet':
      return value * 0.3048;
    case 'inches':
      return value * 0.0254;
    case 'centimeters':
      return value * 0.01;
    default:
      return value;
  }
};

const convertFromMeters = (meters: number, unit: string): number => {
  switch (unit) {
    case 'meters':
      return meters;
    case 'kilometers':
      return meters / 1000;
    case 'miles':
      return meters / 1609.344;
    case 'feet':
      return meters / 0.3048;
    case 'inches':
      return meters / 0.0254;
    case 'centimeters':
      return meters / 0.01;
    default:
      return meters;
  }
};

const convertToKilograms = (value: number, unit: string): number => {
  switch (unit) {
    case 'kilograms':
      return value;
    case 'grams':
      return value / 1000;
    case 'pounds':
      return value * 0.453592;
    case 'ounces':
      return value * 0.0283495;
    default:
      return value;
  }
};

const convertFromKilograms = (kg: number, unit: string): number => {
  switch (unit) {
    case 'kilograms':
      return kg;
    case 'grams':
      return kg * 1000;
    case 'pounds':
      return kg / 0.453592;
    case 'ounces':
      return kg / 0.0283495;
    default:
      return kg;
  }
};

const convertToLiters = (value: number, unit: string): number => {
  switch (unit) {
    case 'liters':
      return value;
    case 'milliliters':
      return value / 1000;
    case 'gallons':
      return value * 3.78541;
    case 'cubic meters':
      return value * 1000;
    case 'cubic feet':
      return value * 28.3168;
    default:
      return value;
  }
};

const convertFromLiters = (liters: number, unit: string): number => {
  switch (unit) {
    case 'liters':
      return liters;
    case 'milliliters':
      return liters * 1000;
    case 'gallons':
      return liters / 3.78541;
    case 'cubic meters':
      return liters / 1000;
    case 'cubic feet':
      return liters / 28.3168;
    default:
      return liters;
  }
};

const convertTemperature = (value: number, from: string, to: string): number => {
  // Convert to Celsius first
  let celsius: number;
  switch (from) {
    case 'Celsius':
      celsius = value;
      break;
    case 'Fahrenheit':
      celsius = (value - 32) * (5 / 9);
      break;
    case 'Kelvin':
      celsius = value - 273.15;
      break;
    default:
      return value;
  }

  // Convert from Celsius to target unit
  switch (to) {
    case 'Celsius':
      return celsius;
    case 'Fahrenheit':
      return (celsius * 9) / 5 + 32;
    case 'Kelvin':
      return celsius + 273.15;
    default:
      return celsius;
  }
};

export default UnitConverter;
