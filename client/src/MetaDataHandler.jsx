import { useState } from 'react';

const PAGE_SIZE = 5;

const formatTwoColumns = (arr) => {
  const colWidth = 20;
  let lines = [];
  for (let i = 0; i < arr.length; i += 2) {
    const col1 = arr[i].padEnd(colWidth);
    const col2 = arr[i + 1] || '';
    lines.push(col1 + col2);
  }
  return lines.join('\n');
};

const useMetadataHandler = ({
  simulateTyping,
  quitMode,
  setAllCrimes,
}) => {
  const [filterStep, setFilterStep] = useState(0);
  const [filters, setFilters] = useState({ city: '', crime: '', weapon: '' });
  const [filterData, setFilterData] = useState({
    cities: [],
    crimes: [],
    weapons: [],
  });

  // Pagination state for displaying records
  const [records, setRecords] = useState([]);
  const [recordPage, setRecordPage] = useState(0);
  const [showingAllRecords, setShowingAllRecords] = useState(false);
  const [awaitingRecordMore, setAwaitingRecordMore] = useState(false);

  // Start the flow and fetch filter data
  const startMetadataFlow = () => {
    setFilterStep(1);
    setFilters({ city: '', crime: '', weapon: '' });
    setRecordPage(0);
    setShowingAllRecords(false);
    setAwaitingRecordMore(false);

    fetch('http://localhost:5000/api/crimes/filters')
      .then((res) => res.json())
      .then((data) => {
        setFilterData({
          cities: data.cities || [],
          crimes: data.crimes || [],
          weapons: data.weapons || [],
        });

        // Show all cities at once
        const formattedCities = formatTwoColumns(data.cities || []);
        simulateTyping(
          `Available Cities:\n${formattedCities}\nPlease type your choice, "skip", or "quit".`,
          '#ffb86c',
          null
        );
      })
      .catch(() => {
        simulateTyping(
          'Failed to fetch filter info.',
          '#ff5555',
          () => askNextFilter(1)
        );
      });
  };

  const askNextFilter = (step) => {
    let question = '';
    switch (step) {
      case 1:
        question = 'Filter by City (or type "skip", "quit") or press Enter to skip:';
        simulateTyping(question, '#8be9fd', null);
        break;
      case 2: {
        // Show all crimes at once
        const formattedCrimes = formatTwoColumns(filterData.crimes);
        simulateTyping(
          `Available Crimes:\n${formattedCrimes}\nPlease type your choice, "skip", or "quit", or press Enter to skip.`,
          '#ffb86c',
          null
        );
        break;
      }
      case 3: {
        // Show all weapons at once
        const formattedWeapons = formatTwoColumns(filterData.weapons);
        simulateTyping(
          `Available Weapons:\n${formattedWeapons}\nPlease type your choice, "skip", or "quit", or press Enter to skip.`,
          '#ffb86c',
          null
        );
        break;
      }
      default:
        break;
    }
  };

  const handleInput = (input) => {
    const trimmed = input.trim();
    const lower = trimmed.toLowerCase();
    const cleaned = trimmed.replace(/[^\w\s-]/gi, ''); // Removes unwanted symbols like "?"

    if (lower === 'quit') {
      quitMode();
      resetState();
      return;
    }

    if (filterStep === 4 && awaitingRecordMore) {
      if (lower === '5 more') {
        showMoreRecords(5);
        return;
      } else if (lower === 'all') {
        showMoreRecords(records.length);
        return;
      } else {
        simulateTyping(
          `Please type "5 more", "all", or "quit".`,
          '#ffb86c',
          null
        );
        return;
      }
    }

    const value = (lower === 'skip' || trimmed === '') ? '' : cleaned;

    switch (filterStep) {
      case 1: {
        const updatedFilters = { ...filters, city: value };
        setFilters(updatedFilters);
        setFilterStep(2);
        askNextFilter(2);
        break;
      }
      case 2: {
        const updatedFilters = { ...filters, crime: value };
        setFilters(updatedFilters);
        setFilterStep(3);
        askNextFilter(3);
        break;
      }
      case 3: {
        const updatedFilters = { ...filters, weapon: value };
        setFilters(updatedFilters);
        setFilterStep(4);
        fetchFilteredCrimes(updatedFilters);
        break;
      }
      default:
        quitMode();
        resetState();
        break;
    }
  };

  const resetState = () => {
    setFilterStep(0);
    setFilters({ city: '', crime: '', weapon: '' });
    setRecordPage(0);
    setShowingAllRecords(false);
    setAwaitingRecordMore(false);
    setRecords([]);
  };

  // Fetch and show filtered crime records
  const fetchFilteredCrimes = async (currentFilters) => {
    try {
      simulateTyping(
        'Fetching filtered crime data...',
        '#a1ef8a',
        null
      );

      const query = [];
      if (currentFilters.city) query.push(`city=${encodeURIComponent(currentFilters.city)}`);
      if (currentFilters.crime) query.push(`crime=${encodeURIComponent(currentFilters.crime)}`);
      if (currentFilters.weapon) query.push(`weapon=${encodeURIComponent(currentFilters.weapon)}`);
      const queryString = query.length ? `?${query.join('&')}` : '';

      const res = await fetch(`http://localhost:5000/api/crimes${queryString}`);
      const data = await res.json();

      setAllCrimes(data);
      setRecords(data);
      setRecordPage(0);
      setShowingAllRecords(false);

      if (!data.length) {
        simulateTyping(
          'No records found with these filters.',
          '#ff5555',
          null
        );
        quitMode();
        resetState();
        return;
      }

      // Show first 5 records or all if less than 5
      const firstBatchCount = Math.min(PAGE_SIZE, data.length);
      showRecordsPage(data, 0, firstBatchCount);

    } catch (err) {
      simulateTyping(
        `Error: ${err.message}`,
        '#ff5555',
        null
      );
      quitMode();
      resetState();
    }
  };

  const showRecordsPage = (dataArray, startIndex, count) => {
    const pageRecords = dataArray.slice(startIndex, startIndex + count);
    const display = pageRecords.map(formatCrime).join('\n');

    let message = `Showing records ${startIndex + 1} to ${startIndex + count} of ${dataArray.length}:\n${display}\n`;

    if (startIndex + count < dataArray.length) {
      message += 'Type "5 more" to see 5 more records, "all" to see all remaining, or "quit" to exit.';
      setAwaitingRecordMore(true);
    } else {
      message += 'End of records. Type "quit" to exit.';
      setAwaitingRecordMore(false);
    }

    setRecordPage(startIndex + count);

    simulateTyping(
      message,
      '#ffb86c',
      null
    );
  };

  const showMoreRecords = (count) => {
    if (showingAllRecords) return; // Already showing all

    const remaining = records.length - recordPage;
    const toShow = count > remaining ? remaining : count;

    showRecordsPage(records, recordPage, toShow);

    if (recordPage + toShow >= records.length) {
      setShowingAllRecords(true);
      setAwaitingRecordMore(false);
    }
  };

  const formatCrime = (crime) => `
📄 Report: ${crime['Report Number']}
📅 Date: ${crime['Date Reported']} | ${crime['Date of Occurrence']} ${crime['Time of Occurrence']}
🏙️ City: ${crime['City']} | ${crime['Crime Code']} - ${crime['Crime Description']}
🧍 Victim: Age ${crime['Victim Age']} | Gender: ${crime['Victim Gender']}
🗡️ Weapon: ${crime['Weapon Used']} | Domain: ${crime['Crime Domain']}
👮 Police: ${crime['Police Deployed']} | Closed: ${crime['Case Closed']} (${crime['Date Case Closed']})
--`;

  return { startMetadataFlow, handleInput };
};

export default useMetadataHandler;
