import { Content } from '../content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Você tem um novo pedido!');
    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less the 5 characters', () => {
    expect(() => new Content('ovo')).toThrow();
  });

  it(' should not be able to create a notification content with more the 240 characters', () => {
    expect(() => new Content('s'.repeat(241))).toThrow();
  });
});
