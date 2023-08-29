import { Container } from '../container';

export const EmptyKeys = () => {
  return (
    <Container>
      <div>
        <h1>api_key and api_secret are required</h1>
        <p>
          You can get them from{' '}
          <a href="https://admin.nebuia.com" target="_blank" rel="noreferrer">
            https://admin.nebuia.com
          </a>
        </p>
      </div>
    </Container>
  );
};
