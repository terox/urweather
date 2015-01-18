module.exports = {

  // rf = reading format used in circular buffer
  'rf.delay'         : [0, 'ub'], // minutes since last stored reading
  'rf.hum_in'        : [1, 'ub'],
  'rf.temp_in'       : [2, 'ss', 0.1, 1],
  'rf.hum_out'       : [4, 'ub'],
  'rf.temp_out'      : [5, 'ss', 0.1, 1],
  'rf.abs_pressure'  : [7, 'us', 0.1, 1],
  'rf.wind_ave'      : [9, 'wa', 0.1, 2], // in metres/sec
  'rf.wind_gust'     : [10, 'wg', 0.1, 2], // in metres/sec
  'rf.wind_dir'      : [12, 'ub', 22.5], // position from north
  'rf.rain'          : [13, 'us', 0.3, 1], // total rain
  'rf.status'        : [15, 'bf', ['b1','b2','b3','b4','b5','lost_sensor_contact','rain_overflow','b8']],

  // fb = fixed block formats
  'fb.read_period'   : [16, 'ub'],
  'fb.settings_1'    : [17, 'bf', [
      'temp_in_F',
      'temp_out_F',
      'rain_in',
      'bit3',
      'bit4',
      'pressure_hPa',
      'pressure_inHg',
      'pressure_mmHg'
    ]
  ],
  'fb.settings_2'    : [18, 'bf', ['wind_mps', 'wind_kmph', 'wind_knot',
  'wind_mph', 'wind_bft', 'bit5',
  'bit6', 'bit7']],
  'fb.display_1'     : [19, 'bf', ['pressure_rel', 'wind_gust', 'clock_12hr',
  'date_mdy', 'time_scale_24', 'show_year',
  'show_day_name', 'alarm_time']],
  'fb.display_2'     : [20, 'bf', ['temp_out_temp', 'temp_out_chill',
  'temp_out_dew', 'rain_hour', 'rain_day',
  'rain_week', 'rain_month', 'rain_total']],
  'fb.alarm_1'       : [21, 'bf', ['bit0', 'time', 'wind_dir', 'bit3',
  'hum_in_lo', 'hum_in_hi',
  'hum_out_lo', 'hum_out_hi']],
  'fb.alarm_2'       : [22, 'bf', ['wind_ave', 'wind_gust',
  'rain_hour', 'rain_day',
  'pressure_abs_lo', 'pressure_abs_hi',
  'pressure_rel_lo', 'pressure_rel_hi']],
  'fb.alarm_3'       : [23, 'bf', ['temp_in_lo', 'temp_in_hi',
  'temp_out_lo', 'temp_out_hi',
  'wind_chill_lo', 'wind_chill_hi',
  'dew_point_lo', 'dew_point_hi']],
  'fb.timezone'      : [24, 'sb'],
  'fb.unknown_01'    : [25, 'pb'],
  'fb.data_changed'  : [26, 'ub'],
  'fb.data_count'    : [27, 'us'],
  'fb.display_3'     : [29, 'bf', ['illuminance_fc', 'bit1', 'bit2', 'bit3',
  'bit4', 'bit5', 'bit6', 'bit7']],
  'fb.current_pos'   : [30, 'us'],
  'fb.rel_pressure'  : [32, 'us', 0.1, 1],
  'fb.abs_pressure'  : [34, 'us', 0.1, 1],
  'fb.lux_wm2_coeff' : [36, 'us', 0.1],
  'fb.date_time'     : [43, 'dt'],
  NA: [0,'XX']
}
