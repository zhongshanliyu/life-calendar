import React from 'react';
import { useToast, Button, Flex, Box, useDisclosure } from '@chakra-ui/core';

import WeekTimeline from './components/WeekTimeline/WeekTimeline';
import DataModal from './components/DataModal/DataModal';
import OptionModal from './components/OptionModal/OptionModal';

// import logo from './logo.svg';
import './App.css';

function App({ dataString }: { dataString: string }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = React.useState(JSON.parse(dataString));

  React.useEffect(() => {
    let visits: number = parseInt(localStorage.getItem('visits') || '0');
    visits++;
    localStorage.setItem('visits', `${visits}`);
    if (visits === 1) {
      toast({
        title: 'Welcome',
        description: `- Each box is a week - Click "Events" to manage them - Works better on Desktop`,
        status: 'info',
        duration: 12000,
        isClosable: true
      });
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Flex m={2} ml={20} justifyContent="space-between" w="100%">
          <h1>
            Life Calendar: Your Life in Weeks{' '}  
          </h1>

          <Box mr={20}>
            <OptionModal />
            <Button size="sm" colorScheme="teal" onClick={onOpen}>
              Events
            </Button>
          </Box>
        </Flex>

        <Box>
          <WeekTimeline data={data} />
        </Box>

        {isOpen && (
          <DataModal
            dataString={JSON.stringify(data, null, 4)}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={(dataJson: any) => {
              // console.log('onSubmit - dataJson', dataJson);
              onClose();
              setData(dataJson);
              toast({
                title: 'Updated',
                description: `You have total ${dataJson.events.length} events (boxes) now.`,
                status: 'success',
                duration: 9000,
                isClosable: true
              });
            }}
          />
        )}
      </header>
    </div>
  );
}

export default App;
